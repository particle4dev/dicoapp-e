// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavigationLayout } from '../Layout';
import routes from '../../constants/routes.json';

type Props = {};

export default class HelpPage extends Component<Props> {
  props: Props;

  render() {
    // const {} = this.props;
    return (
      <NavigationLayout>
        <div>
          <h3>Pre-Login Instructions:</h3>
          <ol>
            <li>Click Create Account</li>
            <li>Click Generate</li>
            <li>
              Save Seed and WIF key and go back to Login. Warning: If you lose
              your Seed you will lose access to your funds/tokens. Keep it safe!
            </li>
            <li>Login with your new Seed</li>
          </ol>
          <h3>After Login:</h3>
          <ol>
            <li>Choose the coin you want to deposit</li>
            <li>
              Once your deposit has confirmed, you will be able to see your
              balance in the top part of the wallet tab. Afterwards, you can
              navigate to the BUY tab and wait for order-books to sync
            </li>
            <li>
              When the order books are synced you will see the price per GLX
              Token and the order section will be enabled.
            </li>
            <li>
              After the BUY tab is activated, you must input the amount of funds
              you want to spend on GLX Token. For this demonstration we will use
              buy 0.1 KMD of GLX Token. In the crowdfund you will have pre-set
              minimum and maximum amounts per swap. After typing the amount
              click BUY. A popup will tell you that the BUY function will be
              locked for 3 minutes.
            </li>
            <li>
              Your swap will begin the process of matching and confirming. If
              the atomic swap does not match in 15 minutes it will timeout
            </li>
          </ol>
          <br />
          <h4>
            For more information and technical assistance please watch the
            instructional video below and join the GLX Token (GLXT) chat group
            at GLX.com:
          </h4>
        </div>
        <Link to={routes.HOME}>to HomePage</Link>
      </NavigationLayout>
    );
  }
}
