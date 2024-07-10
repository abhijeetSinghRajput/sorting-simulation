const container = document.querySelector('.container');

const barsRange = document.getElementById('barsRange');
const barsValue = document.getElementById('barsValue');

// Update delay based on range input value
barsRange.addEventListener('input', (event) => {
    barsValue.textContent = event.target.value;
    addBars(event.target.value);
});

let bars = [];
addBars(50);
scramble();

function sort() {
    if (isSorted()) return;
    switch (selectedAlgorithm) {
        case 'Bubble Sort': bubbleSort(); break;
        case 'Selection Sort': selectionSort(); break;
        case 'Quick Sort': quickSort(0, bars.length - 1); break;
        case 'Merge Sort': mergeSort(0, bars.length - 1); break;
        case 'Insertion Sort': insertionSort(); break;
        case 'Heap Sort': heapSort(); break;
        default: return;
    }
}

function isSorted() {
    for (let i = 0; i < bars.length; ++i) {
        if (+bars[i].getAttribute('value') != i) {
            return false;
        }
    }
    return true;
}

function swapElement(e1, e2) {
    let temp = e1.getAttribute('value');
    e1.setAttribute('value', e2.getAttribute('value'));
    e2.setAttribute('value', temp);

    temp = e1.style.height;
    e1.style.height = e2.style.height;
    e2.style.height = temp;

    temp = e1.title;
    e1.title = e2.title;
    e2.title = temp;
}


function addBars(count) {
    container.innerHTML = '';
    bars = [];

    let d = 100 / count;
    let height = d;
    for (let i = 0; i < count; ++i) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${height}%`;
        bar.setAttribute('value', i);
        bar.title = i;

        container.appendChild(bar);
        bars.push(bar);
        height += d;
    }
}


function scramble() {
    let count = bars.length * 10;
    for (let i = 0; i < count; ++i) {
        let rand1 = Math.floor(Math.random() * bars.length);
        let rand2 = Math.floor(Math.random() * bars.length);
        swapElement(bars[rand1], bars[rand2]);
    }
}



const sortBtn = document.getElementById('sort');
const algorithms = document.querySelectorAll('.drop-box>ul>li');
const menuToggle = document.querySelector('.drop-box>div');
const dropBox = document.querySelector('.drop-box');
let selectedAlgorithm = 'Bubble Sort';

//open algorithms menu
menuToggle.addEventListener('click', () => {
    dropBox.classList.toggle('active');
});

//select algorithm
algorithms.forEach(algorithm => {
    algorithm.addEventListener('click', () => {
        algorithms.forEach(e => e.classList.remove('active'));
        algorithm.classList.add('active');
        selectedAlgorithm = algorithm.textContent;
        sortBtn.textContent = selectedAlgorithm;
        dropBox.classList.remove('active');
    })
})

//focus out from algoritm window
document.addEventListener('mousedown', (e) => {
    if (!dropBox.contains(e.target)) {
        dropBox.classList.remove('active');
    }
})
