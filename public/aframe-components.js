AFRAME.registerComponent("refresh-obj", {
  init: function() {
    this.el.addEventListener("click", function() {
      var GBcursor = document.querySelector("#GBcursor");
      GBcursor.components.raycaster.refreshObjects();
    });
  },
});

AFRAME.registerComponent("star-system", {
  schema: {
    color: {
      type: "string",
      default: "#FFF",
    },
    radius: {
      type: "number",
      default: 300,
      min: 0,
    },
    depth: {
      type: "number",
      default: 300,
      min: 0,
    },
    size: {
      type: "number",
      default: 1,
      min: 0,
    },
    count: {
      type: "number",
      default: 10000,
      min: 0,
    },
    texture: {
      type: "asset",
      default: "",
    },
  },

  update: function() {
    // Check for and load star sprite
    let texture = {};
    if (this.data.texture) {
      texture.transparent = true;
      texture.map = new THREE.TextureLoader().load(this.data.texture);
    }

    const stars = new THREE.Geometry();

    // Randomly create the vertices for the stars
    while (stars.vertices.length < this.data.count) {
      stars.vertices.push(
        this.randomVectorBetweenSpheres(this.data.radius, this.data.depth)
      );
    }

    // Set the star display options
    const starMaterial = new THREE.PointsMaterial(
      Object.assign(texture, {
        color: this.data.color,
        size: this.data.size,
      })
    );

    // Add the star particles to the element
    this.el.setObject3D("star-system", new THREE.Points(stars, starMaterial));
  },

  remove: function() {
    this.el.removeObject3D("star-system");
  },

  // Returns a random vector between the inner sphere
  // and the outer sphere created with radius + depth
  randomVectorBetweenSpheres: function(radius, depth) {
    const randomRadius = Math.floor(
      Math.random() * (radius + depth - radius + 1) + radius
    );
    return this.randomSphereSurfaceVector(randomRadius);
  },

  // Returns a vector on the face of sphere with given radius
  randomSphereSurfaceVector: function(radius) {
    const theta = 2 * Math.PI * Math.random();
    const phi = Math.acos(2 * Math.random() - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  },
});

AFRAME.registerComponent("model-opacity", {
  schema: { default: 1.0 },
  init: function() {
    this.el.addEventListener("model-loaded", this.update.bind(this));
  },
  update: function() {
    var mesh = this.el.getObject3D("mesh");
    var data = this.data;
    if (!mesh) {
      return;
    }
    mesh.traverse(function(node) {
      if (node.isMesh) {
        node.material.opacity = data;
        node.material.transparent = data < 1.0;
        node.material.needsUpdate = true;
      }
    });
  },
});

!(function(e) {
  function t(r) {
    if (n[r]) return n[r].exports;
    var i = (n[r] = { exports: {}, id: r, loaded: !1 });
    return e[r].call(i.exports, i, i.exports, t), (i.loaded = !0), i.exports;
  }
  var n = {};
  return (t.m = e), (t.c = n), (t.p = ""), t(0);
})([
  function(e, t) {
    var n = AFRAME.utils.styleParser;
    if ("undefined" == typeof AFRAME)
      throw new Error(
        "Component attempted to register before AFRAME was available."
      );
    AFRAME.registerComponent("event-set", {
      schema: {
        default: "",
        parse: function(e) {
          var t = n.parse(e),
            r = {};
          return (
            Object.keys(t).forEach(function(e) {
              var n = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
              r[n] = t[e];
            }),
            r
          );
        },
      },
      multiple: !0,
      init: function() {
        (this.eventHandler = null), (this.eventName = null);
      },
      update: function(e) {
        this.removeEventListener(),
          this.updateEventListener(),
          this.addEventListener();
      },
      remove: function() {
        this.removeEventListener();
      },
      pause: function() {
        this.removeEventListener();
      },
      play: function() {
        this.addEventListener();
      },
      updateEventListener: function() {
        var e = this.data,
          t = this.el,
          n = e._event,
          r = e._target;
        delete e._event, delete e._target;
        var i = r ? t.sceneEl.querySelector(r) : t;
        (this.eventName = n),
          (this.eventHandler = function() {
            Object.keys(e).forEach(function(t) {
              AFRAME.utils.entity.setComponentProperty.call(this, i, t, e[t]);
            });
          });
      },
      addEventListener: function() {
        this.el.addEventListener(this.eventName, this.eventHandler);
      },
      removeEventListener: function() {
        this.el.removeEventListener(this.eventName, this.eventHandler);
      },
    });
  },
]);

AFRAME.registerComponent("href", {
  schema: {
    default: "",
  },

  boundClickHandler: undefined,

  clickHandler: function hrefClickHandler() {
    var url = this.data;
    var target = this.el.getAttribute("target");
    console.log("link to " + url);
    if (url && url[0] === "#") {
      // in-page anchor
      var ele = document.querySelector(url);
      var cams = document.querySelectorAll("a-camera");
      if (ele && cams) {
        var targetPosition = ele.getAttribute("position");
        console.log(
          "focus camera to position:" + JSON.stringify(targetPosition)
        );
        cams[0].setAttribute("position", targetPosition);
        window.location.hash = url;
      } else {
        console.log("#id or a-camera is not defined");
      }
    } else {
      // normal hyper link
      if (target) {
        var animation = "";
        var exitAnimation = null;
        console.log("target to " + target);
        if (target.indexOf("#") >= 0) {
          var li = target.split("#");
          target = li[0];
          animation = li[1];
          console.log("target to " + target + " & animate " + animation);
        }
        switch (target) {
          case "_blank":
            if (animation) {
              exitAnimation = document.getElementById(animation);
              exitAnimation.addEventListener(
                "animationend",
                function animationendHandler() {
                  exitAnimation.removeEventListener(
                    "animationend",
                    animationendHandler
                  );
                  window.open(url);
                }
              );
              this.el.emit("href");
            } else {
              window.open(url);
            }
            break;
          case "window":
          default:
            if (animation) {
              exitAnimation = document.getElementById(animation);
              exitAnimation.addEventListener(
                "animationend",
                function animationendHandler() {
                  exitAnimation.removeEventListener(
                    "animationend",
                    animationendHandler
                  );
                  window.location.href = url;
                }
              );
              this.el.emit("href");
            } else {
              window.location.href = url;
            }
            break;
        }
      } else {
        window.location.href = url;
      }
    }
  },

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function() {
    this.boundClickHandler = this.clickHandler.bind(this);
    this.el.addEventListener("click", this.boundClickHandler);
  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function() {
    this.el.removeEventListener("click", this.boundClickHandler);
  },
});

const pnoise3 = `

//
// GLSL textureless classic 3D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-10-11
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/ashima/webgl-noise
//

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise, periodic variant
float pnoise3(vec3 P, vec3 rep)
{
  vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}

`;

AFRAME.registerShader("displacement", {
  schema: {
    timeMsec: { type: "time", is: "uniform" },
  },
  vertexShader:
    pnoise3 +
    `

//
// Based on @thespite's article:
// 
// "Vertex displacement with a noise function using GLSL and three.js"
// Source: https://www.clicktorelease.com/blog/vertex-displacement-noise-3d-webgl-glsl-three-js/
//

varying float noise;
uniform float timeMsec; // A-Frame time in milliseconds.

float turbulence( vec3 p ) {

  float w = 100.0;
  float t = -.5;

  for (float f = 1.0 ; f <= 10.0 ; f++ ){
    float power = pow( 2.0, f );
    t += abs( pnoise3( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );
  }

  return t;

}

void main() {
  float time = timeMsec / 50000.0; // Convert from A-Frame milliseconds to typical time in seconds.
  noise = 10.0 *  -.10 * turbulence( .5 * normal + time / 3.0 );
  float b = 5.0 * pnoise3( 0.05 * position, vec3( 100.0 ) );
  float displacement = (- 10. * noise + b) / 50.0;

  vec3 newPosition = position + normal * displacement;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}

`,
  fragmentShader: `

varying float noise;

void main() {

  vec3 color = vec3(1. - 2. * noise);
  gl_FragColor = vec4( color.rgb, 1.0 );

}

`,
});
