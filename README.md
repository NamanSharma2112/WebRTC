# Overview 
A simple peer-to-peer video chat application built with vanilla JavaScript using WebRTC technology. This project was created from scratch to understand the fundamentals of real-time communication in browsers.

# Features
One-to-one video calling

Real-time audio/video streaming

Session Description Protocol (SDP) exchange

ICE candidate handling

Simple UI with offer/answer mechanism

# Technologies Used
WebRTC API

Vanilla JavaScript

HTML5

CSS3

STUN servers (Google's public servers)

*********************************
On First Device (Offerer):

Click "Create Offer" to generate an SDP offer

Copy the offer from the textarea

On Second Device (Answerer):

Paste the offer into the "SDP Offer" field

Click "Create Answer" to generate an SDP answer

Copy the answer from the textarea

Back to First Device:

Paste the answer into the "SDP Answer" field

Click "Add Answer"

Video connection should now be established!


