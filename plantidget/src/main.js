const { invoke } = window.__TAURI__.core;


invoke("get_plants").then((data) => console.log(data));
invoke("add_plant").then((data) => console.log(data));