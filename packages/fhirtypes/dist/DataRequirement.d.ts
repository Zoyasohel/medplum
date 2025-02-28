/*
 * This is a generated file
 * Do not edit manually.
 */

import { CodeableConcept } from './CodeableConcept';
import { Coding } from './Coding';
import { Duration } from './Duration';
import { Extension } from './Extension';
import { Group } from './Group';
import { Period } from './Period';
import { Reference } from './Reference';

/**
 * Describes a required data item for evaluation in terms of the type of
 * data, and optional code or date-based filters of the data.
 */
export interface DataRequirement {

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
   * The type of the required data, specified as the type name of a
   * resource. For profiles, this value is set to the type of the base
   * resource of the profile.
   */
  type: string;

  /**
   * The profile of the required data, specified as the uri of the profile
   * definition.
   */
  profile?: string[];

  /**
   * The intended subjects of the data requirement. If this element is not
   * provided, a Patient subject is assumed.
   */
  subjectCodeableConcept?: CodeableConcept;

  /**
   * The intended subjects of the data requirement. If this element is not
   * provided, a Patient subject is assumed.
   */
  subjectReference?: Reference<Group>;

  /**
   * Indicates that specific elements of the type are referenced by the
   * knowledge module and must be supported by the consumer in order to
   * obtain an effective evaluation. This does not mean that a value is
   * required for this element, only that the consuming system must
   * understand the element and be able to provide values for it if they
   * are available.
   *
   * The value of mustSupport SHALL be a FHIRPath resolveable on the type
   * of the DataRequirement. The path SHALL consist only of identifiers,
   * constant indexers, and .resolve() (see the [Simple FHIRPath
   * Profile](fhirpath.html#simple) for full details).
   */
  mustSupport?: string[];

  /**
   * Code filters specify additional constraints on the data, specifying
   * the value set of interest for a particular element of the data. Each
   * code filter defines an additional constraint on the data, i.e. code
   * filters are AND'ed, not OR'ed.
   */
  codeFilter?: DataRequirementCodeFilter[];

  /**
   * Date filters specify additional constraints on the data in terms of
   * the applicable date range for specific elements. Each date filter
   * specifies an additional constraint on the data, i.e. date filters are
   * AND'ed, not OR'ed.
   */
  dateFilter?: DataRequirementDateFilter[];

  /**
   * Specifies a maximum number of results that are required (uses the
   * _count search parameter).
   */
  limit?: number;

  /**
   * Specifies the order of the results to be returned.
   */
  sort?: DataRequirementSort[];
}

/**
 * The intended subjects of the data requirement. If this element is not
 * provided, a Patient subject is assumed.
 */
export type DataRequirementSubject = CodeableConcept | Reference<Group>;

/**
 * Code filters specify additional constraints on the data, specifying
 * the value set of interest for a particular element of the data. Each
 * code filter defines an additional constraint on the data, i.e. code
 * filters are AND'ed, not OR'ed.
 */
export interface DataRequirementCodeFilter {

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
   * The code-valued attribute of the filter. The specified path SHALL be a
   * FHIRPath resolveable on the specified type of the DataRequirement, and
   * SHALL consist only of identifiers, constant indexers, and .resolve().
   * The path is allowed to contain qualifiers (.) to traverse
   * sub-elements, as well as indexers ([x]) to traverse
   * multiple-cardinality sub-elements (see the [Simple FHIRPath
   * Profile](fhirpath.html#simple) for full details). Note that the index
   * must be an integer constant. The path must resolve to an element of
   * type code, Coding, or CodeableConcept.
   */
  path?: string;

  /**
   * A token parameter that refers to a search parameter defined on the
   * specified type of the DataRequirement, and which searches on elements
   * of type code, Coding, or CodeableConcept.
   */
  searchParam?: string;

  /**
   * The valueset for the code filter. The valueSet and code elements are
   * additive. If valueSet is specified, the filter will return only those
   * data items for which the value of the code-valued element specified in
   * the path is a member of the specified valueset.
   */
  valueSet?: string;

  /**
   * The codes for the code filter. If values are given, the filter will
   * return only those data items for which the code-valued attribute
   * specified by the path has a value that is one of the specified codes.
   * If codes are specified in addition to a value set, the filter returns
   * items matching a code in the value set or one of the specified codes.
   */
  code?: Coding[];
}

/**
 * Date filters specify additional constraints on the data in terms of
 * the applicable date range for specific elements. Each date filter
 * specifies an additional constraint on the data, i.e. date filters are
 * AND'ed, not OR'ed.
 */
export interface DataRequirementDateFilter {

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
   * The date-valued attribute of the filter. The specified path SHALL be a
   * FHIRPath resolveable on the specified type of the DataRequirement, and
   * SHALL consist only of identifiers, constant indexers, and .resolve().
   * The path is allowed to contain qualifiers (.) to traverse
   * sub-elements, as well as indexers ([x]) to traverse
   * multiple-cardinality sub-elements (see the [Simple FHIRPath
   * Profile](fhirpath.html#simple) for full details). Note that the index
   * must be an integer constant. The path must resolve to an element of
   * type date, dateTime, Period, Schedule, or Timing.
   */
  path?: string;

  /**
   * A date parameter that refers to a search parameter defined on the
   * specified type of the DataRequirement, and which searches on elements
   * of type date, dateTime, Period, Schedule, or Timing.
   */
  searchParam?: string;

  /**
   * The value of the filter. If period is specified, the filter will
   * return only those data items that fall within the bounds determined by
   * the Period, inclusive of the period boundaries. If dateTime is
   * specified, the filter will return only those data items that are equal
   * to the specified dateTime. If a Duration is specified, the filter will
   * return only those data items that fall within Duration before now.
   */
  valueDateTime?: string;

  /**
   * The value of the filter. If period is specified, the filter will
   * return only those data items that fall within the bounds determined by
   * the Period, inclusive of the period boundaries. If dateTime is
   * specified, the filter will return only those data items that are equal
   * to the specified dateTime. If a Duration is specified, the filter will
   * return only those data items that fall within Duration before now.
   */
  valuePeriod?: Period;

  /**
   * The value of the filter. If period is specified, the filter will
   * return only those data items that fall within the bounds determined by
   * the Period, inclusive of the period boundaries. If dateTime is
   * specified, the filter will return only those data items that are equal
   * to the specified dateTime. If a Duration is specified, the filter will
   * return only those data items that fall within Duration before now.
   */
  valueDuration?: Duration;
}

/**
 * The value of the filter. If period is specified, the filter will
 * return only those data items that fall within the bounds determined by
 * the Period, inclusive of the period boundaries. If dateTime is
 * specified, the filter will return only those data items that are equal
 * to the specified dateTime. If a Duration is specified, the filter will
 * return only those data items that fall within Duration before now.
 */
export type DataRequirementDateFilterValue = Duration | Period | string;

/**
 * Specifies the order of the results to be returned.
 */
export interface DataRequirementSort {

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
   * The attribute of the sort. The specified path must be resolvable from
   * the type of the required data. The path is allowed to contain
   * qualifiers (.) to traverse sub-elements, as well as indexers ([x]) to
   * traverse multiple-cardinality sub-elements. Note that the index must
   * be an integer constant.
   */
  path: string;

  /**
   * The direction of the sort, ascending or descending.
   */
  direction: 'ascending' | 'descending';
}
