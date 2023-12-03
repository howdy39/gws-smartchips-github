// @see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/944a188a7545488b475c1568113e1c396a985fc1/types/google-apps-script/addons/google-apps-script.addon-event-objects.d.ts#L100-L108

/**
 * @summary Event object with information on user's document and its contents
 * @see https://developers.google.com/workspace/add-ons/concepts/event-objects#docs_event_object
 */
export interface DocsEventObject {
  id?: string | undefined;
  title?: string | undefined;
  addonHasFileScopePermission: boolean;
  matchedUrl?: {
    url: string;
  };
}
