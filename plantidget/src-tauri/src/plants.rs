use serde::{Deserialize, Serialize};

use std::fs::File;
use std::io::BufReader;
use crate::constants::PLANTS_DB_PATH;

#[derive(Debug, Serialize, Deserialize)]
pub struct Plant {
    id: u32, 
    name: String,
    water_period: u32,
    fertilize_period: u32
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