import React, { Fragment, useState } from "react";

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from "../api";

/**
 * We need a new component called Searchable which:
 *
 * Has a template like this:
 *
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 *
 * When someone clicks the anchor tag, you should:
 *
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 *
 * Then start a try/catch/finally block:
 *
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch:
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = (props) => {
  return (
    <span className="content">
      <a
        href="#"
        onClick={async (event) => {
          event.preventDefault();
          props.setisLoading(true);
          try {
            const result = await fetchQueryResultsFromTermAndValue(
              props.searchTerm,
              props.searchValue
            );
            props.setSearchResults(result);
          } catch (error) {
            console.error("It broke");
          }
          props.setisLoading(false);
        }}
      >
        {props.searchValue}
      </a>
    </span>
  );
};

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 *
 * <main id="feature"></main>
 *
 * And like this when one is:
 *
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 *
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style,
 * technique, medium, dimensions, people, department, division, contact, creditline
 *
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 *
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 *
 * This component should be exported as default.
 */

const Feature = (props) => {
  console.log(props.featuredResult);
  return !props.featuredResult ? (
    <main id="feature"></main>
  ) : (
    <main id="feature">
      <div className="object-feature">
        <header>
          <h3>{props.featuredResult.title}</h3>
          <h4>{props.featuredResult.dated}</h4>
        </header>
        <section className="facts">
          <span className="title">Culture</span>

          <Searchable
            setisLoading={props.setIsLoading}
            setSearchResults={props.setSearchResults}
            searchTerm="culture"
            searchValue={props.featuredResult.culture}
          />
          <span className="title">Technique</span>

          <Searchable
            setisLoading={props.setIsLoading}
            setSearchResults={props.setSearchResults}
            searchTerm="technique"
            searchValue={props.featuredResult.technique}
          />

          <span className="title">Dimensions</span>
          <span>{props.featuredResult.dimensions}</span>

          <span className="title">Person</span>
          {props.featuredResult.peoplecount > 0
            ? props.featuredResult.people.map((ele, index) => {
                return (
                  <Searchable
                    key={index}
                    setisLoading={props.setIsLoading}
                    setSearchResults={props.setSearchResults}
                    searchTerm="people"
                    searchValue={ele.name}
                  />
                );
              })
            : null}

          <span className="title">Division</span>
          <span>{props.featuredResult.division}</span>
          <span className="title">Credit</span>
          <span>{props.featuredResult.creditline}</span>
        </section>
        <section className="photos">
          {props.featuredResult.imagecount > 0
            ? props.featuredResult.images.map((ele, index) => {
                return (
                  <img src={ele.baseimageurl} alt={ele.title} key={index} />
                );
              })
            : null}
        </section>
      </div>
    </main>
  );
};

export default Feature;
