import React , { useState , useEffect } from 'react';

import DuncanStrauss from '../../sentences/BlogSeries/DuncanStrauss';



import withPageFade from '../../bindings/wrappers/withPageFade';

const styles = {

}

const posts = [
  {title:"[Ch. 0] A Shadow at Dawn - The Duncan Strauss Mysteries",
    body:`"It's a terrible business I'm afraid," he said standing. "But I'm not sure you've much to say." The victim groaned. "There's not a terrible lot you've done to earn this, you could say you've won a lottery - of sorts. I'm sure you want to speak, for I'm the last you'll ever see. But I'm just not very interested in anything you have to say. It's nothing personal. Even with all of the technology I can possibly want, there's nothing as elegant as a simple gag; oh the silence, the magnificent silence."`,
    date:new Date(),
    uid:"root"},
  {title:"[Ch. 1] Duncan Strauss - The Duncan Strauss Mysteries",
    body:`"When I'm examining a crime scene," Duncan exuberated, "I like to soak in every detail. Anything that is out of the ordinary, every contradiction, every nuance a clue!" Little Danny, a boy of six, sat eagerly listening to his uncle. It was the first time his uncle had been to visit in nearly a month. "But you see Danny, it only matters what you can detect; people say things - a lot of things. But it's the detective's duty to determine the truth! Oh Danny, nothing matters but the truth! Take nothing for granted. Trust your gut. Trust what you see!"`,
    date:new Date(),
    uid:"root"}
]

function Blog(props) {
  const [selectedDuncan,setSelectedDuncan] = useState(0);
  const navRight = () => setSelectedDuncan((selectedDuncan + 1) % posts.length);
  const navLeft = () => setSelectedDuncan((selectedDuncan - 1 >= 0) ? selectedDuncan - 1 : posts.length - 1);
  return (
    <DuncanStrauss post={posts[selectedDuncan]} navRight={navRight} navLeft={navLeft}/>
  );
}

export default withPageFade(Blog);
