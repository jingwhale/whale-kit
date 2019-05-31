import React, { PureComponent } from 'react';
import lottie from 'lottie-web';
import styles from './index.css'

var animations = ['mnemonics','rejection','inattentive','phonological','estimate'
  ,'dyslexia','articulation','incomprehension','confusion'];

var dataPath = "https://labs.nearpod.com/bodymovin/demo/al_boardman/articulation/";

var emojis = ['angry','angry2','bigSmile','coolGuy','dead','devil','disapointment','disapointment2','eyeBlink','eyeBlink2','goofy','goofyBlink','goofyLove','holyMan','kiss','loudCrying','love','loveShock','nervousLaugn','rofl','sad','sadCry','shift','shock','shyLaugh','suprise','sweatySad','vomit','wat','wat2'];

var emojisHost = 'http://whalexplorer.coding.me/lottieWebAe/emoji/';

export default class ScreenShotUI extends PureComponent {
  constructor(props) {
    super(props);
    this.myRef=React.createRef();
    this.emoji = React.createRef();
    this.state = {
      type: 1,//1,Equal layout;2,Proportional layout
      size: "small"
    };

  };
  loadAnimation = () => {
    for(var i=0;i<animations.length;i++){
      lottie.loadAnimation({
        container: this.myRef.current, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: dataPath + animations[i] + '.json'// the path to the animation json
      });
      console.log(dataPath + animations[i] + '.json');
    }


    for(var i=0;i<emojis.length;i++){
      lottie.loadAnimation({
        container: this.emoji.current, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: emojisHost + emojis[i] + '.json'// the path to the animation json
      });
      console.log(emojisHost + emojis[i] + '.json');
    }

  };

  componentDidMount = () => {
    this.loadAnimation();
  };

  render() {
    return (
      <div className={styles.body}>
        <div className={styles.title}>Created by lottie-web， Designed by AE</div>
        <div className={styles.demo} ref={this.myRef}></div>
        <div className={styles.emoji} ref={this.emoji}></div>
        <div className={styles.whale}>Realization by <a href="https://jing-whale.gitbook.io/whale-design/dong-xiao-she-ji-yu-luo-di" target="_blank">Whale Animation</a> Scheme.</div>
      </div>
    );
  }
}

