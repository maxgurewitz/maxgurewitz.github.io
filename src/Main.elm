module Main exposing (main)

import Browser exposing (Document)
import Element exposing (Element, column, fill, padding, row, spacing, text, width)


type Msg
    = NoOp


type BlogEntry
    = Mit6824


type alias Model =
    { blogEntry : BlogEntry
    }


view : Model -> Document Msg
view _ =
    { title = "Max Gurewitz"
    , body =
        [ Element.layout []
            (column [ width fill ]
                [ header
                , content
                ]
            )
        ]
    }


header : Element Msg
header =
    row [ width fill, padding 20, spacing 20 ] [ text "header" ]


content : Element Msg
content =
    row [ width fill ] [ text "content" ]


init : () -> ( Model, Cmd Msg )
init _ =
    let
        model =
            { blogEntry = Mit6824
            }
    in
    ( model, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update _ model =
    ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


main : Program () Model Msg
main =
    Browser.document
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
