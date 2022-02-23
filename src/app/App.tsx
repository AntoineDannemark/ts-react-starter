import React from 'react';
import {
  IonApp,
  IonRouterOutlet,
  IonPage,
  IonHeader,
  IonContent,
  setupIonicReact,
  isPlatform,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';

import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

setupIonicReact({
  animated: !isPlatform('mobileweb'),
});

const Home: React.FC = () => (
  <IonPage>
    <IonHeader>Home</IonHeader>
    <IonContent>Coucou</IonContent>
  </IonPage>
);
const About: React.FC = () => <div>About</div>;

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
