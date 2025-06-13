class Semaphore {
    constructor(value = 1) {
      this.value = value;
      this.queue = [];
    }
   async wait() {
  if (this.value > 0) {
    this.value--;
    return;
  }
  return new Promise((resolve) => this.queue.push(resolve));
}

  
    signal() {
      if (this.queue.length > 0) {
        const resolve = this.queue.shift();
        resolve();
      } else {
        this.value++;
      }
    }
  }
  
  const mutex = new Semaphore(1);
  const wrt = new Semaphore(1);
  // debugger
  let readerCount = 0;
  let writerActive = false;
  
  async function startOperation(operationType) {
    const time = prompt(`Enter the duration for ${operationType} in seconds:`);
    if (!time || time <= 0) {
      alert("Invalid input!");
      return;
    }
  
    let operationStatus = "";
  
    if (operationType === "reader") {
      await mutex.wait();
      readerCount++;
  
      if (readerCount === 1) {
        await wrt.wait();
      }
  
      mutex.signal();
  
      updateTable();
      operationStatus = "Success: Reader entered";
  
      await sleep(time * 1000);
  
      await mutex.wait();
      readerCount--;
  
      if (readerCount === 0) {
        wrt.signal();
      }
      mutex.signal();
  
      operationStatus = "Success: Reader completed";
      
    } 
    else if (operationType === "writer") {
      await wrt.wait();
      // await mutex.wait();
      writerActive = true;
      updateTable();
      operationStatus = "Success: Writer entered";
      await sleep(time * 1000);
      writerActive = false;
      operationStatus = "Success: Writer completed";
      wrt.signal();
      // mutex.signal();
    }
    updateTable();
    updateOperationTable(operationType, time, operationStatus);
  }
  function updateOperationTable(operationType, duration, status) {
    const table = document.getElementById("operationOutput");
    const row = table.insertRow(-1);
    const typeCell = row.insertCell(0);
    const durationCell = row.insertCell(1);
    const statusCell = row.insertCell(2);
    typeCell.innerHTML = operationType;
    durationCell.innerHTML = duration;
    statusCell.innerHTML = status;
  }
  
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  function updateTable() {
    document.getElementById("mutexValue").innerText = mutex.value;
    document.getElementById("wrtValue").innerText = wrt.value === 0 ? "Locked (0)" : "Available (1)";
    document.getElementById("readerCount").innerText = readerCount;
    document.getElementById("readerStatus").innerText = readerCount > 0 ? "Active" : "Idle";
    document.getElementById("writerStatus").innerText = writerActive ? "Active" : "Idle";

  }
  
  
  