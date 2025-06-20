
let peerConnection;

let localStream;
let remoteStream;

let server = {
    iceServers: [
        {
            urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'],
}]
}

let init = async () =>{
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });


    remoteStream = new MediaStream();
    document.getElementById('user-1').srcObject = localStream;
    document.getElementById('user-2').srcObject = remoteStream;
}

let createOffer = async ()=>{
    peerConnection = new RTCPeerConnection();
    remoteStream = new MediaStream();
    document.getElementById('user-2').srcObject = remoteStream;
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = async (event) => {
        console.log('Track received:', event.track);
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);})
    };
 peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
        console.log('New ICE candidate:', event.candidate);
     document.getElementById('sdp-offer').value = JSON.stringify(peerConnection.localDescription);
    }
 
}


   let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log('Offer created:', offer);
    document.getElementById('sdp-offer').value = JSON.stringify(offer);
}
let createAnswer = async () => {
        peerConnection = new RTCPeerConnection();
    remoteStream = new MediaStream();
    document.getElementById('user-2').srcObject = remoteStream;
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = async (event) => {
        console.log('Track received:', event.track);
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);})
    };
 peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
        console.log('New ICE candidate:', event.candidate);
     document.getElementById('sdp-answer').value = JSON.stringify(peerConnection.localDescription);
    }
 
 }
 let offer = document.getElementById('sdp-offer').value;
    if (offer) {
        offer = JSON.parse(offer);
        await peerConnection.setRemoteDescription(offer);
        console.log('Remote description set:', offer);
    } else {
        console.error('No offer found in the input field.');
        return;
    }

    let answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    console.log('Answer created:', answer);
    document.getElementById('sdp-answer').value = JSON.stringify(answer);
}
let addAnswer = async () =>{
    let answer = document.getElementById('sdp-answer').value;
    if (!answer) return alert('No answer found in the input field.');
    answer = JSON.parse(answer);

    if (!peerConnection.currentRemoteDescription){
        peerConnection.setRemoteDescription(answer)

    }
}

init();

document.getElementById('create-offer').addEventListener('click',createOffer);
document.getElementById('create-answer').addEventListener('click',createAnswer);
document.getElementById('add-answer-btn').addEventListener('click', addAnswer);