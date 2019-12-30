var choosed,total = member.length,remain;
function names(){
    var names = [];
    for(var v in member){
        names.push(member[v].name);
    }
    return names;
} 

    (function(){
        document.getElementById("main").addEventListener("click",function(){
            $('#result').css('display', 'none');
            $('#main').removeClass('mask');
        })
        choosed = JSON.parse(localStorage.getItem('choosed')) || {};
        remain = total - Object.keys(choosed).length
        // console.log(choosed);
        var speed = function(){
            return [0.1 * Math.random() + 0.01, -(0.1 * Math.random() + 0.01)];
        };
        var getKey = function(item){
            return item.id;//item.name + '-' + 
        };
        var createHTML = function(){
            var html = [ '<div id="tags" style="display:none"><ul>' ];
            member.forEach(function(item, index){
                item.index = index;
                var key = getKey(item);
                var color = choosed[key] ? 'yellow' : 'white';
                html.push('<li ><a class="aname" href="#" style="color:'+color+';" onclick="return false" title="'+item.name+'"> \
                    <span>'+item.name+'</span><img src="'+item.thum+'"/></a></li>');//<img src="'+item.thum+'"/></a>
            });
            html.push('</div></ul>');
            return html.join('');
        };
        var lottery = function(count){
            total = member.length;
            var ret = [];
            var list = canvas.getElementsByClassName("aname")//canvas.getElementsByTagName('a');
            var color = '#' + ('00000' + Math.floor(Math.random() * 0xffffff)).slice(-6);
            var color = 'yellow';
            if(remain <= count){
                for(var i in member){
                    key = getKey(member[i])
                    if(!choosed[key] && key != undefined){
                        choosed[key] = 1;
                        // ret.push(member[i].name + '<br/>' + member[i].phone);
                        ret.push(member[i].photo);
                        ret.push(member[i].name);
                        list[i].style.color = color;
                    }
                }
            }else{
                for(var i = 0; i < count; i++){
                do {
                    var id = Math.floor(Math.random() * total);
                    if(member[id]){
                        var key = getKey(member[id]);
                    }
                } while(choosed[key] && key != undefined);
                choosed[key] = 1;
                // console.log(id,key)
                ret.push(member[id].photo);
                ret.push(member[id].name);
                // ret.push(member[id].name + '<br/>' + member[id].phone);
                list[id].style.color = color;
            }
            }

            
           
            localStorage.setItem('choosed', JSON.stringify(choosed));
            remain = total - Object.keys(choosed).length
            // console.log(Object.keys(choosed).length)
            return ret;
        };
        var canvas = document.createElement('canvas');
        canvas.id = 'myCanvas';
        canvas.width = document.body.offsetWidth;
        canvas.height = document.body.offsetHeight;
        document.getElementById('main').appendChild(canvas);
        var DblHelix = function(n, rx, ry, rz) {
            var a = Math.PI / n, i, j, p = [],
                z = rz * 2 / n;
            for(i = 0; i < n; ++i) {
                j = a * i;
                if(i % 2)
                j += Math.PI;
                p.push([rx * Math.cos(j),
                rz - z * i,
                ry * Math.sin(j)]);
            }
            return p;
            }
        var RSquare = function(c, w, h, cx, cy) {
            var d = ((new Date).getTime() % 10000) * Math.PI / 2500;
            c.setTransform(1, 0, 0, 1, 0, 0);
            c.translate(cx, cy);
            c.rotate(d);
            c.globalAlpha = 1;
            c.fillStyle = '#000';
            c.fillRect(-50, -50, 100, 100);
            c.fillStyle = '#fff';
            c.fillRect(-40, -40, 80, 80);
            c.fillStyle = '#000';
            c.fillRect(-30, -30, 60, 60);
            c.fillStyle = '#ff0';
            c.fillRect(-20, -20, 40, 40);
            c.beginPath();
            c.moveTo(0, 0);
            c.arc(0, 0, 15, 0, Math.PI / 2, 0);
            c.lineTo(0, 0);
            c.arc(0, 0, 15, Math.PI, 3 * Math.PI / 2, 0);
            c.fillStyle = '#000';
            c.fill();
            }
 
        new Vue({
            el: '#tools',
            data: {
                selected: 1,
                running: false,
                btns: [
                    1
                ]
            },
            
            ready: function(){
                var that = this;
                canvas.innerHTML = createHTML();
                TagCanvas.Start('myCanvas', 'tags', {
            //         textColour: null,
            //         // textColour: '#000000',
            //         // outlineColour: '',
            //         reverse: true,
            //         // noSelect: true,
            //         minSpeed:0.01,
            //         initial: speed(),
            //         dragControl:true,
            //         textHeight: 14,
            //         weight:true,
            //          weightMode:"both",
            //          weightSize:1.0,
            //          weightGradient:{0:'#f00', 0.33:'#ff0', 0.66:'#0f0', 1:'#00f'},
            //         tooltip: 'div',
            tooltip: 'div', textFont: 'Helvetica, Arial,sans-serif', textHeight: 15,textAlign:"centre",textVAlign:"top",txtScale:2,txtOpt:true,
  textColour: '',tooltipDelay:"300", /* outlineMethod: 'colour', */
  outlineColour: 'rgb(212, 235, 10)', outlineOffset: 5, depth: 0.8, minBrightness: 0.3,
  wheelZoom: true,zoom:1,zoomMax:3,zoomMin:0.3,zoomStep:0.05,
   reverse: true, tooltipDelay: 100, shadowBlur: 2,
   shadow:"#000000",
   shape:"sphere",/*"vring(0.5)", offsetY:-60,lock:"x", */ /*sphere vcylinder hcylinder hring // offsetY:-60//  */ pinchZoom:true,
  shadowOffset: [1,1],initial: speed(), minSpeed:0.01,dragControl:true,
  imageAlign:"centre",imageMode:"both",imagePosition:"top",imageRadius:0.2,imageVAlign:"middle",imageScale:0.1,
  /* centreFunc: RSquare, *//* centreImage:"./img/logo.png" *//* "./img/title.png" */
                });
            },
            methods: {
                reset: function(){
                    if(confirm('确定要重置么？所有之前的抽奖历史将被清除！')){
                        localStorage.clear();
                        location.reload(true);
                    }
                },
                onClick: function(num){
                    $('#result').css('display', 'none');
                    $('#main').removeClass('mask');
                    this.selected = num
                    
                },
                toggle: function(){
                    if(remain==0){
                        this.running = false;
                        $('#result').css('display', 'block').html('<span >所有人都中奖啦！</span>');
                        $('#main').addClass('mask');
                        setTimeout(function(){
                            $('#result').css('display', 'none');
                            $('#main').removeClass('mask');
                        },2000)
                        return
                    }
                    if(this.running){
                        TagCanvas.SetSpeed('myCanvas', speed());
                        var ret;
                        ret = lottery(this.selected);
                       
                        $('#result').css('display', 'block').html('<div><img src="'+ret[0]+'" style="height:380px;"/><br><span>&nbsp;&nbsp;恭喜<i style="font-size: 35px;color: yellow;margin: 10px;">'+ret[1]+'</i>中奖啦！&nbsp;</span></div>')//html('<span>' + ret.join('</span><span>') + '</span>');
                        TagCanvas.Reload('myCanvas');
                        setTimeout(function(){
                            localStorage.setItem(new Date().toString(), JSON.stringify(ret));
                            $('#main').addClass('mask');
                        }, 300);
                        // console.log(ret);
                    } else {
                        $('#result').css('display', 'none');
                        $('#main').removeClass('mask');
                        TagCanvas.SetSpeed('myCanvas', [5, 1]);
                    }
                    this.running = !this.running
                }
            }
        });
    })();