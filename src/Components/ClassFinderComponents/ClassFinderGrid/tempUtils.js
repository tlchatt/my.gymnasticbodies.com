
function oneOf(array) {
  return array[Math.floor(Math.random() * Math.floor(array.length))];
}

let uuid = 0;
export function generateItems() {
  const items = [];
  for (let i = 0; i < 20; i++) {
    const difficulty = oneOf(['Beginner', 'Moderate', 'Intermediate', 'Advanced']);
    const description = oneOf(['Skipping your warm up should be out of the question, but if you want to hit the important points in seven minutes, this one will do the trick. Warm up and stretch all of your biggest muscle groups and be ready to jump into your strength work.', "Kicking into a handstand is just the beginning. Learn how to control your 'stand form from its base by testing your tuck. Tucks will show you if you're stabilized from your fingertips to your shoulders and whether your hips are really stacked. And tucks never lie."])
    const title = oneOf(['7 Minute Warm Up', 'Bands Chest & Scap'])
    const type = oneOf(['Warmup', 'Strength', 'Mobility', 'Movement']);
    const duration = oneOf(['Short', 'Medium', 'Long']);
    const MySchedule = oneOf(['MySchedule', ''])
    const mediaId = oneOf(['jTRUtQhq','NVG7Iyg0' ])

    const id = uuid++;
    const show = true;

    items.push({ id, difficulty, type, duration, show, MySchedule, mediaId, description, title });
  }
  return items;
}



export const allIds = {
  rehab:[
    60291,
    60264,
    60033,
    59915,
    59616,
    59310,
    59255,
    59172
  ],
  mobilize : [
    60205,
    59178,
    59614,
    59600,
    59216,
    59210,
    59222,
    59182,
    59176,
    59168,
    59278,
    59606,
    59257
  ],
  strengthen : [
    60198,
    60195,
    59921,
    59274,
    59180,
    59207,
    59219,
    59213,
    59676,
    59603,
    59460,
    59190,
    59188,
    59186,
    59174,
    59172,
    59170,
    59152,
    59895,
    59897,
    59752,
    59606,
    59308,
    59228,
    59225,
    59909,
    59905,
    59315,
    59661,
    59857,
    59983,
    60088,
    60210,
    59304,
    60099
  ]
}

