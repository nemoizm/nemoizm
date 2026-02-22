const fs = require("fs");

const getQuote = async () => {
  try {
    const response = await fetch("https://api.animechan.io/v1/quotes/random");

    if (!response.ok) {
      throw new Error(`Animechan API error: ${response.status}`);
    }

    const payload = await response.json();
    const quote = payload?.data?.content;
    const character = payload?.data?.character?.name;
    const anime = payload?.data?.anime?.name;

    console.log("new quote", `"${quote}"`);

    return {
      quote,
      character,
      anime,
    };
  } catch (err) {
    console.error(err.message);
    return {};
  }
};

const generate = async () => {
  const { quote, character, anime } = await getQuote();

  if (!quote || !character || !anime) return;

  fs.writeFileSync("README.md", `_**${quote}**_\n\n${character} (${anime})`);
};

generate();