use serde::{Deserialize, Serialize};

use std::fs::{self, File};
use std::io::BufReader;
use crate::constants::PLANTS_DB_PATH;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum Genus {
    Monstera,
    Calathea,
    Succulent,
    Aglaonema,
    Fittonia,
    Other(String),
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum LightRequirement {
    Direct,
    BrightIndirect,
    MediumIndirect,
    Low,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum SoilType {
    WellDraining,
    MoistureRetaining,
    Succulent,
    Orchid,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum Month {
    January, February, March, April, May, June, 
    July, August, September, October, November, December,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SeasonalCare {
    pub growth_interval_days: u32,
    pub dormant_interval_days: u32,
}


#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Plant {
    // 1. Identification
    pub id: u32,
    pub name: String,         // e.g., "Monstera regular"
    pub genus: Genus,
    pub species: String,      // e.g., "M. deliciosa"

    // 2. Lifecycle
    pub growth_start: Month,
    pub growth_end: Month,

    // 3. Watering & Feeding
    pub watering: SeasonalCare,
    pub fertilizing: SeasonalCare,
    pub fertilizer_dilution: String, // e.g., "1:2"
    
    pub misting_interval_days: Option<u32>, 

    // 4. Environment
    pub light: LightRequirement,
    pub soil: SoilType,

    pub last_watered: Option<String>,
    pub last_fertilized: Option<String>,

    // 5. Custom Information
    pub notes: Vec<String>,
}

#[tauri::command]
pub fn read_plants() -> Result<Vec<Plant>, String> {
    let file = File::open(PLANTS_DB_PATH).map_err(|e| e.to_string())?;
    let reader = BufReader::new(file);

    let loaded_plants: Vec<Plant> = serde_json::from_reader(reader).map_err(|e| e.to_string())?;
    
    // tmp code
    for plant in &loaded_plants {
        dbg!(plant);
    }

    Ok(loaded_plants)
}

#[tauri::command]
// pub fn add_plant(new_plant: Plant) -> Result<String, String> {
pub fn add_plant() -> Result<String, String> {

    let mut plant_vec: Vec<Plant> = match read_plants() {
        Ok(plants) => plants,
        Err(_) => Vec::new(),
    };


    // HARDCODED PART FOR TESTING TO BE DELETED
    let monstera_water_care = SeasonalCare {
        growth_interval_days: 6,
        dormant_interval_days: 14
    };

    let monster_fert_care = SeasonalCare {
        growth_interval_days: 7,
        dormant_interval_days: 30,
    };

let new_plant = Plant {
        id: 2,
        name: "Monstera regular".to_string(),
        genus: Genus::Monstera,
        species: "M. deliciosa".to_string(),

        growth_start: Month::March,
        growth_end: Month::October,

        watering: monstera_water_care,
        fertilizing: monster_fert_care,
        fertilizer_dilution: "1:2".to_string(),

        misting_interval_days: Some(7),

        light: LightRequirement::BrightIndirect,
        soil: SoilType::WellDraining,

        last_watered: None,
        last_fertilized: None,

        notes: vec!["Needs a stick to lean on".to_string(),]
    };

    plant_vec.push(new_plant);

    let json_data = serde_json::to_string_pretty(&plant_vec)
        .map_err(|e| e.to_string())?;
    fs::write(PLANTS_DB_PATH, &json_data)
        .map_err(|e| e.to_string())?;
    
    let res_str = format!("Successfully added a plant: {}", json_data);
    Ok(res_str)
}