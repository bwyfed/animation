/**
 * Created by BWY on 2017/11/28.
 */
var imgUrl = 'rabbit-big.png';
var positions = ['0 -854','-174 -852', '-349 -852', '-524 -852', '-698 -852','-873, -848'];
var ele = document.getElementById('rabbit');

animation(ele, positions, imgUrl);

function animation(ele,positions,imgUrl) {
    //定时改变背景图片位置，完成动画
    ele.style.backgroundImage = 'url(' + imgUrl + ')';
    ele.style.backgroundRepeat = 'no-repeat';
    //索引用于记录当前的位置
    var index = 0;
    function run() {

        var position = positions[index].split(' ');//每一帧的位置
        ele.style.backgroundPosition = position[0]+'px '+position[1]+'px';
        index++;
        if(index >= positions.length) {
            index = 0;
        }
        setTimeout(run,80);
    }
    run();
}