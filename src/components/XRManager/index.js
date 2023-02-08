

export function XRManager({ 
  startButton,
  onReady
}) {

  let xrSession;
  let onSelectCallback;

  if ('xr' in window.navigator) {
    console.log('xr detected')
  } else {
    return console.log('no xr')
  }

  if ('xr' in window.navigator) {
    startButton.obj.addEventListener('click', onClickArButton);
    navigator.xr.isSessionSupported('immersive-ar')
      .then(isSupported => startButton.disabled = !isSupported);
  }


  function onClickArButton () {
    if (!xrSession) {
      navigator.xr.requestSession('immersive-ar', { requiredFeatures: [ 'hit-test'], optionalFeatures: [ 'dom-overlay' ], domOverlay: { root: document.body }})
        .then(session => onSessionStart(session));
    } else {
      xrSession.end()
        .then(() => onSessionEnd());
    }
  }
 
  const onSessionStart = async (session) => {
    xrSession = session;
    xrSession.addEventListener('select', onSelect);
    startButton.setVisible(false);
    onReady();
  }

  const onSessionEnd = () => {
    console.log('onSessionEnd')
  }

  const onSelect = (ev) => {
    if (onSelectCallback !== undefined) onSelectCallback(ev);
  }

  return {
    get obj() { return xrSession },
    get xrSession() { return xrSession},
    get inputSources() { return xrSession.inputSources},
    setOnSelectCallback: (f) => { onSelectCallback = f}
  }
}