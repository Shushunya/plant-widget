use serde::{Deserialize, Serialize};
use tauri::Manager;

use std::fs::{self, File};
use std::io::BufReader;
use std::path::Path;

#[derive(Debug, Serialize, Deserialize)]
struct Plant {
    id: u32, 
    name: String,
    water_period: u32,
    fertilize_period: u32
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let file_path = "plants.json";
            let mut has_plants = false;

            if !Path::new(file_path).exists() {
                println!("No plants.json file");
                fs::write(file_path, "[]").unwrap_or_else(|e| {
                    println!("Failed to create plants.json: {}", e)
                })
            }

            if let Ok(file) = File::open(file_path) {
                let reader = BufReader::new(file);


                if let Ok(loaded_plants) = serde_json::from_reader::<_, Vec<Plant>>(reader) {
                    if !loaded_plants.is_empty() {
                        has_plants = true;
                    }
                }
            }

            if has_plants {
                println!("Has plants. Should open widget.");
                if let Some(widget_window) = app.get_webview_window("widget") {
                    widget_window.show().unwrap();
                }
            } else {
                println!("No plants. Main win.");
                if let Some(main_window) = app.get_webview_window("main") {
                    main_window.show().unwrap();
                }
            }

            Ok(())
        })
        .on_window_event(|window, event| match event {
            tauri::WindowEvent::Destroyed => {
                println!("Closed main window.");
                window.app_handle().exit(0);
            }
            _ => {}
        }

        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
