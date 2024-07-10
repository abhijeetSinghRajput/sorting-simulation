

//simulating
function bubbleSort() {
    let x = 0;
    for (let i = 0; i < bars.length; ++i) {
        for (let j = 0; j < bars.length - 1; ++j) {
            setTimeout(() => {
                if (+bars[j].getAttribute('value') > +bars[j + 1].getAttribute('value')) {
                    swapElement(bars[j], bars[j + 1]);
                }
            }, 5 * x++);
        }
    }
}

//simulating
function selectionSort() {
    let x = 0;
    for (let i = 0; i < bars.length; ++i) {
        for (let j = i + 1; j < bars.length; ++j) {
            setTimeout(() => {
                if (+bars[i].getAttribute('value') > +bars[j].getAttribute('value')) {
                    swapElement(bars[i], bars[j]);
                }
            }, 5 * x++);

        }
    }
}

//not simulating with setTimeout same with other function
function insertionSort() {
    let x = 0;
    for (let i = 1; i < bars.length; ++i) {
        for (let j = i; j > 0; --j) {
            if (+bars[j].getAttribute('value') > +bars[j - 1].getAttribute('value')) {
                break;
            }
            // setTimeout(()=>{
            swapElement(bars[j], bars[j - 1]);
            // }, 5 * x++);
        }
    }
}


function quickSort(low, high) {
    console.log()
    if (low >= high) return;
    let pivot = partition(low, high);
    quickSort(low, pivot - 1);
    quickSort(pivot + 1, high);
}

function partition(low, high) {
    let pivot = +bars[low].getAttribute('value');
    let i = low + 1;
    let j = high;
    let x = 0;
    while (i <= j) {
        while (i <= j && +bars[i].getAttribute('value') <= pivot) {
            i++;
        }
        while (i <= j && +bars[j].getAttribute('value') >= pivot) {
            j--;
        }
        if (i < j) {
            swapElement(bars[i], bars[j]);
        }
    }
    swapElement(bars[low], bars[j]);
    return j;
}



function mergeSort(low, high) {
    if (low >= high) return;
    let mid = Math.floor((low + high) / 2);
    mergeSort(low, mid);
    mergeSort(mid + 1, high);
    merge(low, mid, high);
}

function merge(low, mid, high) {
    let i = low, j = mid + 1;
    let temp = [];
    while (i <= mid && j <= high) {
        if (+bars[i].getAttribute('value') < +bars[j].getAttribute('value')) {
            temp.push({
                height: bars[i].style.height,
                value: bars[i++].getAttribute('value'),
            });
        }
        else {
            temp.push({
                height: bars[j].style.height,
                value: bars[j++].getAttribute('value'),
            });
        }
    }

    while (i <= mid) {
        temp.push({
            height: bars[i].style.height,
            value: bars[i++].getAttribute('value'),
        });
    }
    while (j <= high) {
        temp.push({
            height: bars[j].style.height,
            value: bars[j++].getAttribute('value'),
        });
    }

    j = 0;
    for (i = low; i <= high; ++i, ++j) {
        bars[i].style.height = temp[j].height;
        bars[i].setAttribute('value', temp[j].value);
        bars[i].title = temp[j].value;
    }
}




function heapSort() {
    let n = bars.length;

    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; --i) {
        downHeapify(i, n);
    }

    let x = 0;
    // One by one extract elements from heap
    for (let i = n - 1; i > 0; --i) {
        swapElement(bars[0], bars[i]);
        downHeapify(0, i);
    }
}

let x = 0;
function downHeapify(i, n) {
    let max = i;
    let left = (i * 2) + 1;
    let right = (i * 2) + 2;

    if (left < n && +bars[max].getAttribute('value') < +bars[left].getAttribute('value')) {
        max = left;
    }
    if (right < n && +bars[max].getAttribute('value') < +bars[right].getAttribute('value')) {
        max = right;
    }

    if (max != i) {
        swapElement(bars[i], bars[max]);
        downHeapify(max, n);
    }
}
