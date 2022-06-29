// Common
import { default as init } from "./common/base";

// Helpers
import { Component } from "./helpers/component";

// Components
import { Slider } from "../../components/slider/slider";
import { HeroVideo } from "../../components/herovideo/herovideo";

// Registering components
Component.register("Slider", Slider);
Component.register("HeroVideo", HeroVideo);

init();
