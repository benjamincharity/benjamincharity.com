import { ContactRouterConfig } from './contact.routes';
import { CONTACT } from './contact.constant';
import { ContactController } from './contact.controller';

angular.module('bc.contact', [])
    .config(ContactRouterConfig)
    .constant('CONTACT', CONTACT)
    .controller('ContactController', ContactController)
;

