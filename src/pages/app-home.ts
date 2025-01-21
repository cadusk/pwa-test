import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

import { styles } from '../styles/shared-styles';

@customElement('app-home')
export class AppHome extends LitElement {

  @property() phoneNumber = '';

  updatePhoneNumber(e: Event) {
    const target = e.target as HTMLInputElement;
    this.phoneNumber = target.value;
  }

  makeCall() {
    if (this.phoneNumber) {
      window.location.href = `tel:${this.phoneNumber}`;
    } else {
      alert('Please, enter a valid phone number.');
    }
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
        <div id="welcomeBar">
          <sl-card id="makeCallsCard">
            <h2>Make a call</h2>
            <p>To make a call, type in the phone number and click 'Call'.</p>
            <p>This will redirect a tel: link and should open the default calling app on your device.</p>
            <div id="callInput">
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Phone Number - ex. +1 555-123-4567"
                  @input=${this.updatePhoneNumber}>
                <button @click=${this.makeCall}>Call</button>
              </div>
          </sl-card>

          <sl-card id="pushNotificationCard">
            <h2>Send Push Notifications</h2>
          </sl-card>

        </div>
      </main>
    `;
  }
}
