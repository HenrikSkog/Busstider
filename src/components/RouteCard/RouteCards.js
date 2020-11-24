import React, { useContext } from 'react';
import Context from '../Context';
import RouteCard from './index';

export default function RouteCards() {
  const { state } = useContext(Context);
  return state.routes.map(route => <RouteCard key={route.id} route={route} />);
}
