module Main exposing (..)

import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Json.Decode exposing (Decoder)
import Http exposing (Error)


main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


type alias Model =
    { images : List Image
    , error : Maybe String
    }


type alias Image =
    { name : String
    , tag : String
    }


init : ( Model, Cmd Msg )
init =
    ( Model [] Nothing, Cmd.none )


getImages : Cmd Msg
getImages =
    sendGet LoadImages url decoder


sendGet : (Result Error a -> msg) -> String -> Decoder a -> Cmd msg
sendGet msg url decoder =
    Http.get url decoder
        |> Http.send msg


decoder : Decoder (List Image)
decoder =
    Json.Decode.at [ "repositories" ] Json.Decode.list imageDecoder


imageDecoder : Decoder Image
imageDecoder =
    Json.Decode.map toImage


toImage : String -> Image
toImage name =
    Image name "latest"


url : String
url =
    "http://registry.yxapp.xyz/v2/_catalog"



-- UPDATE


type Msg
    = LoadImages (Result Http.Error (List Image))


update : Msg -> Model -> Model
update msg model =
    case msg of
        LoadImages images ->
            case images of
                Ok images ->
                    ( { model | images = images }, Cmd.none )

                Err err ->
                    Debug.crash "" err



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ button [ onClick Decrement ] [ text "-" ]
        , div [] [ text (toString model) ]
        , button [ onClick Increment ] [ text "+" ]
        ]
