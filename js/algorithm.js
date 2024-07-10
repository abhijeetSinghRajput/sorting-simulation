
let swaps = [];

function bubbleSort() {
    swaps = [];
    for (let i = 0; i < bars.length; ++i) {
        for (let j = 0; j < bars.length - 1; ++j) {
            if (arr[j] > arr[j + 1]) {
                swap(j, j + 1);
                swaps.push({
                    x: j,
                    y: j + 1
                });
            }
        }
    }
    animate(swaps, 'swap');
}


function selectionSort() {
    swaps = [];
    for (let i = 0; i < bars.length; ++i) {
        for (let j = i + 1; j < bars.length; ++j) {
            if (arr[i] > arr[j]) {
                swap(i, j);
                swaps.push({
                    x: i,
                    y: j,
                });
            }
        }
    }
    animate(swaps, 'swap');
}

function insertionSort() {
    swaps = [];
    for (let i = 1; i < bars.length; ++i) {
        for (let j = i; j > 0; --j) {
            if (arr[j] > arr[j - 1]) {
                break;
            }
            swap(j, j - 1);
            swaps.push({
                x: j,
                y: j - 1,
            });
        }
    }
    animate(swaps, 'swap');
}

function quickSort(low, high) {
    swaps = [];
    helperQuickSort(low, high);
    animate(swaps, 'swap');
}

function helperQuickSort(low, high) {
    if (low >= high) return;
    let pivot = partition(low, high);
    helperQuickSort(low, pivot - 1);
    helperQuickSort(pivot + 1, high);
}

function partition(low, high) {
    let pivot = arr[low];
    let i = low + 1;
    let j = high;
    while (i <= j) {
        while (i <= j && arr[i] <= pivot) {
            i++;
        }
        while (i <= j && arr[j] >= pivot) {
            j--;
        }
        if (i < j) {
            swap(i, j);
            swaps.push({
                x: i,
                y: j,
            });
        }
    }
    swap(low, j);
    swaps.push({
        x: low,
        y: j,
    });
    return j;
}


let assignment = [];
function mergeSort(low, high) {
    assignment = [];
    helperMergeSort(low, high);
    animate(assignment, 'assign');
}

function helperMergeSort(low, high) {
    if (low >= high) return;
    let mid = Math.floor((low + high) / 2);
    helperMergeSort(low, mid);
    helperMergeSort(mid + 1, high);
    merge(low, mid, high);
}

function merge(low, mid, high) {
    let i = low, j = mid + 1;
    let temp = [];
    while (i <= mid && j <= high) {
        if (arr[i] < arr[j]) {
            temp.push(arr[i++]);
        }
        else {
            temp.push(arr[j++]);
        }
    }

    while (i <= mid) {
        temp.push(arr[i++]);
    }
    while (j <= high) {
        temp.push(arr[j++]);
    }

    j = 0;
    for (i = low; i <= high; ++i, ++j) {
        arr[i] = temp[j];
        assignment.push({
            index: i,
            value: j,
        });
    }
}




function heapSort() {
    let n = arr.length;
    swaps = [];

    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; --i) {
        downHeapify(i, n);
    }

    // One by one extract elements from heap
    for (let i = n - 1; i > 0; --i) {
        swap(0, i);
        swaps.push({
            x: 0,
            y: i,
        });
        downHeapify(0, i);
    }

    animate(swaps, 'swap');
}

function downHeapify(i, n) {
    let max = i;
    let left = (i * 2) + 1;
    let right = (i * 2) + 2;

    if (left < n && arr[max] < arr[left]) {
        max = left;
    }
    if (right < n && arr[max] < arr[right]) {
        max = right;
    }

    if (max != i) {
        swap(i, max);
        swaps.push({
            x: i,
            y: max,
        });
        downHeapify(max, n);
    }
}

// ==================================================
// ===================== utility ====================
// ==================================================



function swap(x, y) {
    [arr[x], arr[y]] = [arr[y], arr[x]];
}

function getHeight(value) {
    return (100 / bars.length) * (value + 1);
}

function animate(arr, type) {

    for (let i = 0; i < arr.length; ++i) {
        setTimeout(() => {
            if (type == 'swap') {
                swapElement(bars[arr[i].x], bars[arr[i].y]);
            }
            else {
                bars[arr[i].index].style.height = `${getHeight(arr[i].value)}%`;
                bars[arr[i].index].setAttribute('value', arr[i].value);
                bars[arr[i].index].title = arr[i].value;
            }
        }, animationDelay * i);
    }
    
    setTimeout(check, animationDelay * arr.length);
}
