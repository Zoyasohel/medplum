/*
 * This is a generated file
 * Do not edit manually.
 */

import { DataRequirement } from './DataRequirement';
import { Expression } from './Expression';
import { Extension } from './Extension';
import { Reference } from './Reference';
import { Schedule } from './Schedule';
import { Timing } from './Timing';

/**
 * A description of a triggering event. Triggering events can be named
 * events, data events, or periodic, as determined by the type element.
 */
export interface TriggerDefinition {

  /**
   * Unique id for the element within a resource (for internal references).
   * This may be any string value that does not contain spaces.
   */
  id?: string;

  /**
   * May be used to represent additional information that is not part of
   * the basic definition of the element. To make the use of extensions
   * safe and manageable, there is a strict set of governance  applied to
   * the definition and use of extensions. Though any implementer can
   * define an extension, there is a set of requirements that SHALL be met
   * as part of the definition of the extension.
   */
  extension?: Extension[];

  /**
   * The type of triggering event.
   */
  type: 'named-event' | 'periodic' | 'data-changed' | 'data-added' | 'data-modified' | 'data-removed' | 'data-accessed' | 'data-access-ended';

  /**
   * A formal name for the event. This may be an absolute URI that
   * identifies the event formally (e.g. from a trigger registry), or a
   * simple relative URI that identifies the event in a local context.
   */
  name?: string;

  /**
   * The timing of the event (if this is a periodic trigger).
   */
  timingTiming?: Timing;

  /**
   * The timing of the event (if this is a periodic trigger).
   */
  timingReference?: Reference<Schedule>;

  /**
   * The timing of the event (if this is a periodic trigger).
   */
  timingDate?: string;

  /**
   * The timing of the event (if this is a periodic trigger).
   */
  timingDateTime?: string;

  /**
   * The triggering data of the event (if this is a data trigger). If more
   * than one data is requirement is specified, then all the data
   * requirements must be true.
   */
  data?: DataRequirement[];

  /**
   * A boolean-valued expression that is evaluated in the context of the
   * container of the trigger definition and returns whether or not the
   * trigger fires.
   */
  condition?: Expression;
}

/**
 * The timing of the event (if this is a periodic trigger).
 */
export type TriggerDefinitionTiming = Reference<Schedule> | string | Timing;
