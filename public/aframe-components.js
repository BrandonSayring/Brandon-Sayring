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
