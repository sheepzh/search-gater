import IDomCompleteHandler from "./chrome/interface/i-dom-complete-hanler";
import AutoCryptorDomHanlder from './components/sns-zero/auto-cryptor-dom-hanlder';
import DoubleClick2DecryptDomHandler from './components/sns-zero/dbclick-2-decrypt-dom-handler'

const handlers: IDomCompleteHandler[] = []

handlers.push(new AutoCryptorDomHanlder())
handlers.push(new DoubleClick2DecryptDomHandler())

window.onload = () =>
    handlers.forEach(handler => {
        handler.support(window.location.host, window.location.href) && handler.handle()
    })

