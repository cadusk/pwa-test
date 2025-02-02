import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { Twilio } from '../components/twilio';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

import { styles } from '../styles/shared-styles';
@customElement('app-home')
export class AppHome extends LitElement {

  @property() phoneNumber = '';
  @property() notificationTime = 0;
  @property() twilio: Twilio = new Twilio('');


  updatePhoneNumber(e: Event) {
    const target = e.target as HTMLInputElement;
    this.phoneNumber = target.value;
  }

  updateNotificationTime(e: Event) {
    const target = e.target as HTMLInputElement;
    this.notificationTime = +target.value;
  }

  makeCall() {
    if (!this.phoneNumber) {
      alert('Phone number shouldn\'t be empty.');
      return;
    }
    this.twilio.makeCall(this.phoneNumber);
  }

  hangUp(){
    this.twilio.hangUp();
  }

  @property() scheduleNotificationTimeout = 0;

  updateScheduleNotificationTimeout(e: Event) {
    const target = e.target as HTMLInputElement;
    this.scheduleNotificationTimeout = Number(target.value);
  }

  async getTwilioToken():Promise<Twilio>{
    try{
      const response = await fetch('https://pushnotificationpi.azurewebsites.net/twilio/token');
      const data = await response.json();
      const token = data.token;
      const twilio = new Twilio(token);
      console.log('Twilio ready!');
      return twilio;
    } catch(error){
      console.error('Failed to get Twilio token:', error);
      return new Twilio('');
    }
  }

  async subscribeUser() {
    if (!('serviceWorker' in navigator)) {
      console.error('Service workers are not supported by this browser.');
      return;
    }
    const registration = await navigator.serviceWorker.ready;
    try {
      let subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 'BN9seiGCuLY_kUI1bmgQa-YzQUe4-nGTC_mK6GAz2NrmVwWOySH3dwZsJkD2dWmZC8AA6hxyI7A9SHqcZAZa6oM'
        });
      }
      const response = await fetch('https://pushnotificationpi.azurewebsites.net/pushnotification/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });

      if (response.ok) {
        console.log('Subscription sent to backend successfully.');
      } else {
        console.error('Failed to send subscription to backend.');
      }
    } catch (error) {
      console.error('Failed to subscribe the user:', error);
    }
  }

  async requestNotificationPermission(){
    const permission = await Notification.requestPermission();
    console.log('permission', permission)
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          await this.subscribeUser(); // Call the updated subscribeUser function
        } else {
          console.log('Notification permission denied.');
        }
  }

  async scheduleNotification() {
    if (this.scheduleNotificationTimeout <= 0) {
      alert('Schedule notification timeout must be a number.');
      return;
    }

    await this.requestNotificationPermission();
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString(); // Formata a hora atual

    const payload = {
      title: 'Push notification',
      body: `This is a push notification! Current time: ${formattedTime}`,
      scheduleNotificationTimeout: this.scheduleNotificationTimeout
    };

    await fetch(
      'https://pushnotificationpi.azurewebsites.net/pushnotification/send-notification',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload: JSON.stringify(payload) }),
      }
    );
  }

  waitSeconds(seconds = 0) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }

  static styles = [
    styles,
    css`
    #welcomeBar {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    #notificationScheduler {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-top: 16px;
    }

    #notificationScheduler input {
      flex: 1;
      padding: 8px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    #notificationScheduler button {
      padding: 8px 16px;
      font-size: 16px;
      background-color: #0078d7;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    #notificationScheduler button:hover {
      background-color: #005a9e;
    }

    #callInput {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-top: 16px;
    }

    #callInput input {
      flex: 1;
      padding: 8px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    #callInput button {
      padding: 8px 16px;
      font-size: 16px;
      background-color: #0078d7;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    #callInput button:hover {
      background-color: #005a9e;
    }

    .notification {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-top: 16px;
    }

    .notification input {
      flex: 1;
      padding: 8px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .notification button {
      padding: 8px 16px;
      font-size: 16px;
      background-color: #0078d7;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .notification-button button:hover {
      background-color: #005a9e;
    }

    #welcomeCard,
    #infoCard {
      padding: 18px;
      padding-top: 0px;
    }

    sl-card::part(footer) {
      display: flex;
      justify-content: flex-end;
    }

    @media(min-width: 750px) {
      sl-card {
        width: 70vw;
      }
    }

    #logoContainer {
      text-align: center;
      margin-bottom: 20px;
    }

    #appLogo {
      max-width: 150px;
      height: auto;
    }

    @media (horizontal-viewport-segments: 2) {
      #welcomeBar {
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
      }

      #welcomeCard {
        margin-right: 64px;
      }
    }
  `];

  async firstUpdated() {
    console.log('This is your home page');
    this.twilio = await this.getTwilioToken();
  }

  share() {
    if ((navigator as any).share) {
      (navigator as any).share({
        title: 'PWABuilder pwa-starter',
        text: 'Check out the PWABuilder pwa-starter!',
        url: 'https://github.com/pwa-builder/pwa-starter',
      });
    }
  }

  render() {
    return html`
      <app-header></app-header>

      <main>
        <div id="logoContainer">
          <img src="/assets/icons/logo.png" alt="Logo" id="appLogo">
        </div>
        <div id="welcomeBar">
          <sl-card id="makeCallsCard">
            <h2>Make a call using Twilio</h2>
            <p>To make a call, type in the phone number and click 'Call'.</p>
            <p>This will access a Twilio Account and make a call</p>
            <div id="callInput">
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Phone Number - ex. +1 555-123-4567"
                  @input=${this.updatePhoneNumber}>
                <button @click=${this.makeCall}>Call</button>
                <button @click=${this.hangUp}>End Call</button>
              </div>
          </sl-card>

          <br/>

          <sl-card id="pushNotificationCard">
            <h2>Schedule Push Notifications</h2>
            <p>Enter the number of seconds you would like to wait until the application triggers a new notification.</p>
            <p>The goal is to be able to test if the app is able to send notification at the OS level, integrating as a native app would do.</p>

            <div id="notificationScheduler">
                <input
                  type="number"
                  id="notificationTime"
                  placeholder="Seconds to wait - ex: 5"
                  @input=${this.updateScheduleNotificationTimeout}>
                <button @click=${this.scheduleNotification}>Schedule</button>
              </div>
          </sl-card>

        </div>
      </main>
    `;
  }
}