'use strict';

// const localStorage = localStorage;

// Opening画面からスタートをクリックするとOpeningが消え、コミカルなGIFと共にMain画面が表示される
function click_start() {
    console.log("OK");
    $(".full").css("display","none");
    $(".opening").fadeIn(500);
    $(".opening").css("display","block");
    $(".opening").fadeOut(3000);
    $("#mainvisual").fadeIn(3200);
    $("#mainvisual").css("display", "block");
    // function audio() {
    //   document.getElementById('bgm1').currentTime = 0;
    //   document.getElementById('bgm1').play();
    // }  
  };

// 各パーツの定義
const table = document.querySelector('table');  //表
const todo = document.getElementById('todo'); //todo
const parts = document.querySelector('select'); //部位
const weight = document.getElementById('weight'); //weight
// const weight = document.querySelector('input[type="number]'); //weight　　インプットタイプでは引けない
const set = document.getElementById('set'); //No of sets
const reps = document.getElementById('reps'); //reps per set
const date = document.querySelector('input[type="date"]'); //日付(締め切り日）
const submit = document.getElementById('submit'); //登録ボタン

//TODO リストの全データを「オブジェクトの配列」としてプログラムで持っておいて、それをストレージに書き出す処理
let list = []; // TODOリストのデータ

// 記録ボタンを押した際の処理。
$("#submit").on('click', function() {

    // submit.addEventListener('click', () => {
      const item = {}; //入力情報を一時保存するためのボックス
    
      // 種目だけは、*をつけて必須項目にし、未入力ではアラートが出る
      if (todo.value != '') {todo.value
        item.todo = todo.value;
      } else {
        alert ('何をやったか分からないヨ、もったいない！入力してください');
      }
    
      //項目を足す
      item.parts = parts.value;
      item.weight = weight.value;
      item.set = set.value;
      item.reps = reps.value;
    
      item.date = date.value;
      //日付、入力がない場合は本日を入力したかったが上手くいかず
    //   if (date.value != '') {
    //     item.date = date.value;
    //   } else {
    //     date.value = date.toLocaleDateString('en-CA');
    //     item.date = date.value;
    //   }
    
    //   item.done = false;
      console.log(item); // 入力情報の確認
    
      //フォーム情報のリセット. わざわざ各項目描く以外に参照する方法あるか？
      todo.value = '';
      parts.value = '';
      weight.value = '';
      set.value = '';
      reps.value = '';
      date.value = '';
    
      addItem(item);
    
      // ストレージに保存する前に、配列 list に最新 TODO データである item を追加（push）
    //   list.push(item);
      localStorage.todoList = JSON.stringify(list);
    });

// クリアボタンの処理。
$("#clear").on("click", function() {
    localStorage.clear();　// localStorageの中身を消す
    $('#list').empty();    // リスト自体の中身を消す
    $('#list').append(list);
})

document.addEventListener('DOMContentLoaded', () => {
  // 1. ストレージデータ（JSON）の読み込み
  const json = localStorage.todoList;
  if (json == undefined) { // ストレージデータがない場合は何もしない
    return;     
    }

  // 2. JSONをオブジェクトの配列に変換して配列listに代入
  list = JSON.parse(json); 
  console.log(list);

  // 3. 配列listのデータを元にテーブルに要素を追加
  for (const item of list) {
  addItem(item);
  console.log(item);
  }
});

//item内にある情報を表示する処理を繰り返すための処理
const addItem = (item) => {
  const tr = document.createElement('tr'); // テーブルのtr要素を生成

  // オブジェクトの繰り返しはfor-in文、ループ定数（prop）のプロパティとしてitemを指定。
  for (const prop in item) {
    const td = document.createElement('td'); // テーブルのtd要素を生成

    if (prop == 'done') { // 完了欄の場合の処理
      const checkbox = document.createElement('input'); // 要素生成
      checkbox.type = 'checkbox'; // type属性をcheckboxに
      checkbox.checked = item[prop]; // checked属性を設定
      td.appendChild(checkbox); // td要素の子要素に
      checkbox.addEventListener('change', checkBoxListener);
    } else { //完了欄以外の場合の処理
      td.textContent = item[prop];
    }
    tr.appendChild(td);
  }

  table.append(tr);
};

// グラフ表示をやってみる
$(function(){
    //横軸ラベル
    const label = ['1','2','3','4','5','6','7'];

    //グラフ作成用のデータを準備
    const data = {
        labels: label,
        datasets: [
        {
            label: 'ベンチプレスベスト', //グラフタイトル
            backgroundColor: 'rgb(255,99,132,0)', //背景色
            borderColor: 'rgb(255,99,132)', //線の色
            data: [80,90,100,105,110,125,115], //グラフの実データ
            tension: 0, //0で鋭角、0以上でカーブする
            pointStyle: 'cross', //ポイントの形
            borderWidth: 1.5 //線の幅
        },
        {
            label: '懸垂総重量', //グラフタイトル
            backgroundColor: 'rgb(255,99,132,0)', //背景色
            borderColor: 'rgb(55,99,132)', //線の色
            data: [74,75,78,78,76,74,72], //グラフの実データ
            tension: 0, //0で鋭角、0以上でカーブする
            pointStyle: 'cross', //ポイントの形
            borderWidth: 1.5 //線の幅
        },
        ]
    };

    //グラフの設定
    const settei = {
        type: 'line', //線グラフ
        data: data, //データを指定
        options: {} //オプションがあれば{}内に記述
    };

    //グラフを出力
    var kekka = new Chart(
        $('#MyChart'),
        settei
    );
});

// 作業メモ
// グラフは種目、部位ごとにグルーピングしてdatasetを作り直さないといけない
// 日付と連動した時系列の作り方を調べたい
// Number()、または PerseInt('文字列', 10) 10進数の整数で数値化は出来そう
// 数値の比較
// if文でsave時に史上最高を更新したら、お祝いのファンファーレを鳴らしたい
// メダルが溜まる等のゲーミフィケーションの要素をいれたい
// 削除ボタンを各項目に入れたかったがヘッダーに入ってしまった