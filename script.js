// 웹캠 비디오 스트림 설정
const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('photoCanvas');
const captureBtn = document.getElementById('captureBtn');
const context = canvasElement.getContext('2d');

async function startWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        webcamElement.srcObject = stream;
    } catch (err) {
        console.error('Error accessing the webcam: ', err);
    }
}

captureBtn.addEventListener('click', () => {
    // 웹캠 영상을 캔버스에 그리기
    canvasElement.width = webcamElement.videoWidth;
    canvasElement.height = webcamElement.videoHeight;
    context.drawImage(webcamElement, 0, 0, webcamElement.videoWidth, webcamElement.videoHeight);
    // 저장된 이미지를 다운로드 가능하게 설정
    const image = canvasElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'photo.png';
    link.click();
});

startWebcam();
