mod constants;
mod plants;

use tauri::Manager;

use std::fs::{self, File};
use std::io::BufReader;
use std::path::Path;

use constants::PLANTS_DB_PATH;
use plants::{read_plants, add_plant, Plant};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![read_plants, add_plant])
        .setup(|app| {
            let mut has_plants = false;

            if !Path::new(PLANTS_DB_PATH).exists() {
                println!("No plants.json file");
                fs::write(PLANTS_DB_PATH, "[]").unwrap_or_else(|e| {
                    println!("Failed to create plants.json: {}", e)
                })
            }

            if let Ok(file) = File::open(PLANTS_DB_PATH) {
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
