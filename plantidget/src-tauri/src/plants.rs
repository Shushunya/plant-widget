use serde::{Deserialize, Serialize};

use std::fs::File;
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
    pub last_fertilizes: Option<String>,

    // 5. Custom Information
    pub notes: Vec<String>,
}

// #[derive(Debug, Serialize, Deserialize)]
// pub struct Plant {
//     id: u32, 
//     name: String,
//     water_period: u32,
//     fertilize_period: u32
// }


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