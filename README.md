# Change The Luminosity

**Visit the [Live Site](https://colour-tool.vercel.app/)!**

<p>
   <img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white" title="HTML5" alt="HTML5">
   <img src="https://img.shields.io/badge/CSS3-1572B6.svg?style=for-the-badge&logo=CSS3&logoColor=white" title="CSS3" alt="CSS3">
   <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black" title="JavaScript" alt="JavaScript">
   <img src="https://img.shields.io/badge/Vercel-000000.svg?style=for-the-badge&logo=Vercel&logoColor=white" title="Vercel" alt="Vercel">
</p>

Inspired from Scrimba's Color Tool: [Build a color tool in vanilla JavaScript](https://scrimba.com/learn/javascriptcolortool). This was my **first real project**. Although I went through the wonderful tutorial, I completed 99% of the steps prior to watching the _solutions_ and the design was all mine.

![Change the Luminosity screenshot in basic stage with input, toggle, range, input color box & altered color box](colour_tool.png)

## Project requirements:

1. Takes a user **inputted hex code**, which can entered with or without a **#** and must be either **3 or 6 characters of 0-9 and/or a-f**. This colour is then displayed on the page.
2. A **toggle** button lets the user choose to lighten or darken the colour. Labels are **de-emphasized** when not selected.
3. A **range slider** determines how much to alter the colour, showing the current percentage.
4. The tool uses JavaScript to **convert the hex code to rgb**, alter by the given percentage, **convert back from rgb to hex** and display it on the page.

## Extra features

1. Chose a **dark palette** to emphasize displayed colours and added box shadows for texture.
2. Improved **UX** with a **gradient on the range slider for extra visual clues** on how to use. Changed gradient when toggle switched with `.root {--gradient: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(87,90,94,1) 60%, rgba(213,213,219,1) 100%); }` and an **event listener** on the toggle button using `root.style.setProperty`.
3. Drew attention to outputted hex code by placing in `<span>` and adjusting CSS with `#alteredColorText { padding: 0 1em; font-size: 1.35em; }`.
4. Used `clamp` on `font-size` and `.container` to make responsize. Added border around toggle button for mobile screens.
5. Added **copy button** for user to copy outputted hex to their clipboard:

```js
copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(alteredHex);
  alert(`Hex code ${alteredHex} was copied to your clipboard`);
});
```

6. Added a **popup** to confirm the code was indeed copied - with a pretty cool animation.
7. Made **accessibility improvements** using `tabindex` and `aria-roledescription`. Added focus and hover states for all interactive page elements.

![Screenshot showing lighten colour, darken colour, and accessibility features](change_the_luminosity.gif).

> This screenshot shows my original `alert` telling the user the code was copied, but I updated this in mind with the **user experience**. I decided to not _force_ the user to make an additional click on the OK button.
