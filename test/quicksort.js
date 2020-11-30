function quickSort(arr, left, right) {
  let len = arr.length
  left = left || 0
  right = right || len - 1
  if (left < right) {
    let partitionIndex = partition(arr, left, right)
    quickSort(arr, left, partitionIndex - 1)
    quickSort(arr, partitionIndex + 1, right)
  }
  return arr
}

function partition(arr, left, right) {
  let pivotkey = arr[left]
  while (left < right) {
    while (left < right && arr[right] >= pivotkey) {
      right--
    }
    arr[left] = arr[right]
    while (left < right && arr[left] <= pivotkey) {
      left++
    }
    arr[right] = arr[left]
  }
  arr[left] = pivotkey
  return left
}

console.log(quickSort([12, 32, 12, 3, 1, 789, 6, 4, 3, 10], 0, 9))