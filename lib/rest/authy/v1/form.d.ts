/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */

import Page = require('../../../base/Page');
import Response = require('../../../http/response');
import V1 = require('../V1');
import { SerializableClass } from '../../../interfaces';

type FormFormTypes = 'form-app-push'|'form-sms'|'form-totp';

/**
 * @description Initialize the FormList
 * PLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 *
 * @param version - Version of the resource
 */
declare function FormList(version: V1): FormListInstance;

interface FormListInstance {
  /**
   * @param sid - sid of instance
   */
  (sid: string): FormContext;
  /**
   * Constructs a form
   *
   * @param type - The Type of this Form
   */
  get(type: string): FormContext;
}

interface FormPayload extends FormResource, Page.TwilioResponsePayload {
}

interface FormResource {
  form_meta: string;
  forms: string;
  type: FormFormTypes;
  url: string;
}

interface FormSolution {
}


declare class FormContext {
  /**
   * Initialize the FormContextPLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
   *
   * @param version - Version of the resource
   * @param type - The Type of this Form
   */
  constructor(version: V1, type: FormFormTypes);

  /**
   * fetch a FormInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: FormInstance) => any): Promise<FormInstance>;
}


declare class FormInstance extends SerializableClass {
  /**
   * Initialize the FormContextPLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
   *
   * @property type - The Type of this Form
   * @property forms - Object that contains the available forms for this type.
   * @property formMeta - Additional information for the available forms for this type.
   * @property url - The URL to access the forms for this type.
   *
   * @param version - Version of the resource
   * @param payload - The instance payload
   * @param type - The Type of this Form
   */
  constructor(version: V1, payload: FormPayload, type: FormFormTypes);

  private _proxy: FormContext;
  /**
   * fetch a FormInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: FormInstance) => any): void;
  formMeta: string;
  forms: string;
  /**
   * Produce a plain JSON object version of the FormInstance for serialization.
   * Removes any circular references in the object.
   */
  toJSON(): any;
  type: FormFormTypes;
  url: string;
}


declare class FormPage extends Page<V1, FormPayload, FormResource, FormInstance> {
  /**
   * Initialize the FormPagePLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
   *
   * @param version - Version of the resource
   * @param response - Response from the API
   * @param solution - Path solution
   */
  constructor(version: V1, response: Response<string>, solution: FormSolution);

  /**
   * Build an instance of FormInstance
   *
   * @param payload - Payload response from the API
   */
  getInstance(payload: FormPayload): FormInstance;
}

export { FormContext, FormInstance, FormList, FormListInstance, FormPage, FormPayload, FormResource, FormSolution }
