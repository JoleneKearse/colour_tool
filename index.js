const hexInput = document.getElementById("hexInput");
const inputColor = document.getElementById("inputColor");;
const lightenText = document.getElementById("lightenText");
const darkenText = document.getElementById("darkenText");
const toggleBtn = document.getElementById("toggleBtn");
const toggle = document.querySelector("[aria-pressed]");
const root = document.documentElement;
const slider = document.getElementById("slider");
const sliderText = document.getElementById("sliderText");
const alteredColor = document.getElementById("alteredColor");
const alteredColorText = document.getElementById("alteredColorText");
const copyBtn = document.getElementById("copyBtn");

// display initial range track appearance
root.style.setProperty("--gradient", "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(87,90,94,1) 60%, rgba(213,213,219,1) 100%)");

// verify valid hex & display colour when user enters hex
hexInput.addEventListener("input", () => {
    const hex = hexInput.value;
    if (!isValidHex(hex)) return;
    // if user doesn't enter #, create var without, then add to inputColour
    const strippedHex = hex.replace("#", "");
    // display to input colour box
    inputColor.style.backgroundColor = "#" + strippedHex;
    
    reset();
});

// verify input matches hex code pattern
const isValidHex = (hex) => {
    const hexRegex = /^#*[\da-f]{3}$|^#*[\da-f]{6}$/gi;
    if(!hex) return false;
    const strippedHex = hex.replace("#", "");
    if (hexRegex.test(hex)) {
        return strippedHex.length === 3 || strippedHex.length === 6;
    }
}

// CONVERT HEX TO RGB
const convertHexToRGB = (hex) => {
    // only trigger if valid hex code
    if (!isValidHex(hex)) return null;
    let strippedHex = hex.replace("#", "");
    // convert user input to 6 chars if only 3
    if (strippedHex.length === 3) {
        strippedHex = strippedHex[0] + strippedHex[0] 
        + strippedHex[1] + strippedHex[1] 
        + strippedHex[2] + strippedHex[2];  
    }
    // access in three groups to return rgb values
    // tried to use bracket notation here and got NaN error rather than returned 0, substring fixed this
    const red = parseInt(strippedHex.substring(0, 2), 16);
    const green = parseInt(strippedHex.substring(2, 4), 16);
    const blue = parseInt(strippedHex.substring(4, 6), 16);
    // return as an object
    return {red, green, blue};
}

// CONVERT HEX TO RGB
const pairToHex = (color) => {
    let pair  = color.toString(16);
    
    return pair.length === 1 ? "0" + pair : pair;
}
  
const convertRGBToHex = (red, green, blue) => {
    const hex = "#" + pairToHex(red) + pairToHex(green) + pairToHex(blue);
    return hex;
}

// Make slider interactive by increasing luminosity of hex colour
const alterColor = (hex, percentage) => {
    // use restructuring to call conversion on obj
    const {red, green, blue} = convertHexToRGB(hex);
    // formula to find amt to increase rgb values
    const amount = Math.floor((percentage / 100) * 255);
    // new variables
    const newRed = keepBetween0And255(red, amount);
    const newGreen = keepBetween0And255(green, amount);
    const newBlue = keepBetween0And255(blue, amount);
    return convertRGBToHex(newRed, newGreen, newBlue);
}

// ensure values are within rgb range of 0 to 255
const keepBetween0And255 = (hex, amount) => {
    return Math.min(255, Math.max(0, hex + amount));
}

let alteredHex;
slider.addEventListener("input", () => {
    // check if hex is valid
    if (!isValidHex(hexInput.value)) return;
    sliderText.textContent = `${slider.value}%`;
    // ALTER COLOUR BY PERCENTAGE
    // determine if should lighten or darken
    const sliderValue = toggleBtn.classList.contains("toggled") ? -slider.value : slider.value;
    // get the altered hex 
    alteredHex = alterColor(hexInput.value, sliderValue);
    alteredColor.style.backgroundColor = alteredHex;
    alteredColorText.innerText = `${alteredHex.toUpperCase()}`;
    alteredColorText.style.color = alteredHex;
});

// add lighten / darken toggle button interactivity

toggleBtn.addEventListener("click", () => {
    if (toggleBtn.classList.contains("toggled")) {
        toggleBtn.classList.remove("toggled");
        lightenText.classList.remove("unselected");
        darkenText.classList.add("unselected");
        root.style.setProperty("--gradient", "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(87,90,94,1) 60%, rgba(213,213,219,1) 100%)");
    } else {
        toggleBtn.classList.add("toggled");
        lightenText.classList.add("unselected");
        darkenText.classList.remove("unselected");
        root.style.setProperty("--gradient", "linear-gradient(90deg, rgba(213,213,219,1) 0%, rgba(87,90,94,1) 60%, rgba(0,0,0,1) 100%)");
    }
    reset();
});

// make toggle button accessible
toggle.addEventListener("click", (e) => {
    let pressed = e.target.getAttribute("aria-pressed") === true;
    e.target.setAttribute("aria-pressed", String(!pressed));
});

const reset = () => {
    slider.value = 0;
    sliderText.textContent = "0%";
    alteredColor.style.backgroundColor = hexInput.value;
    alteredColorText.textContent = "";
    // navigator.clipboard.writeText("");
};

copyBtn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(alteredHex.toUpperCase());
});
