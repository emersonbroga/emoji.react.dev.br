import domtoimage from "dom-to-image";
import { useEffect, useState } from "react";
import "./App.css";

const arrayRange = (start, stop, step = 1) => {
  if (start === stop) {
    return [start];
  }
  return Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);
};

const ignore = [
  ...arrayRange(128500, 128505),
  ...arrayRange(128592, 128639),
  ...arrayRange(128710, 128714),
  ...arrayRange(128723, 128724),
  ...arrayRange(128728, 128731),
  ...arrayRange(128742, 128744),
  ...arrayRange(128746, 128746),
  ...arrayRange(128749, 128751),
  ...arrayRange(128753, 128754),
  ...arrayRange(128765, 128767),
  ...arrayRange(128884, 128991),
  ...arrayRange(129004, 129007),
  ...arrayRange(129009, 129291),
  ...arrayRange(129339, 129339),
  ...arrayRange(129350, 129350),
  ...arrayRange(129536, 129647),
  ...arrayRange(129661, 129663),
  ...arrayRange(129673, 129679),
  ...arrayRange(129726, 129726),
  ...arrayRange(129734, 129741),
  ...arrayRange(129756, 129759),
  ...arrayRange(129769, 129775),
  ...arrayRange(129785, 131082),
  ...arrayRange(131084, 131093),
  ...arrayRange(131096, 131104),
  ...arrayRange(131106, 131110),
  ...arrayRange(131113, 131113),
  ...arrayRange(131116, 131121),
  ...arrayRange(131125, 131133),
  ...arrayRange(131137, 131137),
  ...arrayRange(131139, 131139),
  ...arrayRange(131141, 131141),
  ...arrayRange(129784, 131149),
  ...arrayRange(128489, 128494),
  ...arrayRange(128496, 128498),
  ...arrayRange(128484, 128487),
  ...arrayRange(128482, 128482),
  ...arrayRange(128479, 128480),
  ...arrayRange(128468, 128475),
  ...arrayRange(128445, 128449),
  ...arrayRange(128453, 128464),
  ...arrayRange(128435, 128443),
  ...arrayRange(128425, 128432),
  ...arrayRange(128422, 128423),
  ...arrayRange(128407, 128419),
  ...arrayRange(128401, 128404),
  ...arrayRange(128398, 128399),
  ...arrayRange(128392, 128393),
  ...arrayRange(128379, 128390),
  ...arrayRange(128369, 128370),
  ...arrayRange(128360, 128366),
  ...arrayRange(128335, 128335),
  ...arrayRange(128318, 128328),
  ...arrayRange(128254, 128254),
  ...arrayRange(127990, 127990),
  ...arrayRange(127985, 127986),
  ...arrayRange(127900, 127901),
  ...arrayRange(127896, 127896),
  ...arrayRange(127896, 127896),
  ...arrayRange(127892, 127893),
  ...arrayRange(127700, 127743),
  ...arrayRange(127778, 127779),
];

//https://github.com/rickstaa/github-emoji-picker/blob/main/src/data/github_emojis.json
// console.log(ignore);
const emojis = [];

const start = 127744;
const end = 129783;

// 129783
for (let codePoint = start; codePoint <= end; codePoint++) {
  if (ignore.includes(codePoint)) continue;
  const emoji = String.fromCodePoint(codePoint);
  // console.log(codePoint, emoji); // You can replace this with your desired operation
  emojis.push({ emoji, codePoint });
}

const perPage = 20;
function App() {
  const [items, setItems] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(perPage);

  useEffect(() => {
    console.log(start, end);
    const partial = emojis.slice(start, end);
    setItems(partial);

    // const node = document.getElementById("image");
    // // domtoimage.toBlob(document.getElementById("image")).then(function (blob) {
    // //   saveAs(blob, "emoji.png");
    // // });
    // domtoimage
    //   .toPng(node)
    //   .then(function (dataUrl) {
    //     setUrl(dataUrl);
    //   })
    //   .catch(function (error) {
    //     console.error("oops, something went wrong!", error);
    //   });
  }, [start, end]);

  useEffect(() => {
    for (let i = 0; i < items.length; i++) {
      const node = document.getElementById(`emoji-${items[i].codePoint}`);
      const image = document.getElementById(`image-${items[i].codePoint}`);
      domtoimage
        .toPng(node)
        .then(function (dataUrl) {
          image.src = dataUrl;

          node.classList.add("hidden");
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
        });
    }
  }, [items]);

  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => {
            if (start - perPage <= 0) {
              setStart(0);
              setEnd(perPage);
              return;
            }
            setStart((prev) => prev - perPage);
            setEnd((prev) => prev - perPage);
          }}
        >
          PREV
        </button>
        <span className="page-display">
          {start}-{end}/{emojis.length}
        </span>
        <button
          type="button"
          onClick={() => {
            if (end + perPage >= emojis.length) {
              setEnd(emojis.length);
              return;
            }
            setStart((prev) => prev + perPage);
            setEnd((prev) => prev + perPage);
          }}
        >
          NEXT
        </button>
      </div>
      <div className="emoji-list">
        {items.map((item) => {
          return (
            <div key={item.codePoint} className="emoji-list-item">
              <div id={`emoji-${item.codePoint}`} className="emoji">
                {item.emoji}
              </div>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                className="emoji"
                id={`image-${item.codePoint}`}
              />
              <br />
              <small>{item.codePoint}</small>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
