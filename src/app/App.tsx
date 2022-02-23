import React from 'react';
import {
  IonApp,
  IonRouterOutlet,
  IonPage,
  IonHeader,
  IonContent,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';

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
