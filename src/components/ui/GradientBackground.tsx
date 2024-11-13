"use client";
import React, { useEffect, useRef } from "react";

interface ProgramInfo {
  program: WebGLProgram;
  attribLocations: {
    vertexPosition: number;
  };
  uniformLocations: {
    resolution: WebGLUniformLocation | null;
    time: WebGLUniformLocation | null;
    backgroundColor: WebGLUniformLocation | null;
    primaryColor: WebGLUniformLocation | null;
  };
}

const vertexShaderSource = `
  attribute vec4 aVertexPosition;
  void main() {
      gl_Position = aVertexPosition;
  }
`;

const fragmentShaderSource = `
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;
  uniform vec4 uBackgroundColor;
  uniform vec4 uPrimaryColor;

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
      float slowTime = iTime * 0.04;  
      
      vec2 uv = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);
      
      for(float i = 1.0; i < 10.0; i++){
          uv.x += 0.6 / i * cos(i * 2.5 * uv.y + slowTime);
          uv.y += 0.6 / i * cos(i * 1.5 * uv.x + slowTime);
      }
      
      // Calculate blend factor between 0 and 1
      float blendFactor = clamp(abs(sin(slowTime-uv.y-uv.x)), 0.0, 1.0);
      
      // Linear interpolation between background and primary colors
      vec3 color = mix(uBackgroundColor.rgb, uPrimaryColor.rgb, blendFactor);
      
      // Ensure proper alpha
      fragColor = vec4(color, 1.0);
  }

  void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
  }
`;

function hexToRGB(hex: string): [number, number, number] {
  // Remove # if present
  hex = hex.replace("#", "");

  // Ensure proper formatting
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  // Convert to RGB values between 0 and 1
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  return [r, g, b];
}

function getCSSColorValue(propertyName: string): [number, number, number] {
  try {
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue(propertyName)
      .trim();

    if (!color) {
      console.warn(`No color found for ${propertyName}, using fallback`);
      return [0, 0, 0];
    }

    return hexToRGB(color);
  } catch (error) {
    console.error(`Error getting color for ${propertyName}:`, error);
    return [0, 0, 0];
  }
}

const GradientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const programInfoRef = useRef<ProgramInfo | null>(null);
  const positionBufferRef = useRef<WebGLBuffer | null>(null);

  useEffect(() => {
    let gl: WebGLRenderingContext | null = null;

    const createShader = (type: number, source: string): WebGLShader | null => {
      if (!gl) return null;
      const shader = gl.createShader(type);
      if (!shader) return null;

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const initShaderProgram = (
      vsSource: string,
      fsSource: string,
    ): WebGLProgram | null => {
      if (!gl) return null;
      const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
      const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);

      if (!vertexShader || !fragmentShader) return null;

      const shaderProgram = gl.createProgram();
      if (!shaderProgram) return null;

      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);

      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error(
          "Program link error:",
          gl.getProgramInfoLog(shaderProgram),
        );
        return null;
      }
      return shaderProgram;
    };

    const initWebGL = (): boolean => {
      const canvas = canvasRef.current;
      if (!canvas) return false;

      gl = canvas.getContext("webgl");
      if (!gl) {
        console.error("WebGL not supported");
        return false;
      }

      const shaderProgram = initShaderProgram(
        vertexShaderSource,
        fragmentShaderSource,
      );
      if (!shaderProgram) return false;

      programInfoRef.current = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(
            shaderProgram,
            "aVertexPosition",
          ),
        },
        uniformLocations: {
          resolution: gl.getUniformLocation(shaderProgram, "iResolution"),
          time: gl.getUniformLocation(shaderProgram, "iTime"),
          backgroundColor: gl.getUniformLocation(
            shaderProgram,
            "uBackgroundColor",
          ),
          primaryColor: gl.getUniformLocation(shaderProgram, "uPrimaryColor"),
        },
      };

      const positions = new Float32Array([
        -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0,
      ]);

      positionBufferRef.current = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferRef.current);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

      return true;
    };

    const render = (now: number): void => {
      now *= 0.001; // Convert to seconds

      if (!gl || !programInfoRef.current) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      }

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(programInfoRef.current.program);

      // Get colors from CSS variables
      const backgroundColor = getCSSColorValue("--background-shader");
      const primaryColor = getCSSColorValue("--primary-shader");

      // Update uniforms
      gl.uniform2f(
        programInfoRef.current.uniformLocations.resolution,
        gl.canvas.width,
        gl.canvas.height,
      );
      gl.uniform1f(programInfoRef.current.uniformLocations.time, now);
      gl.uniform4f(
        programInfoRef.current.uniformLocations.backgroundColor,
        ...backgroundColor,
        1.0,
      );
      gl.uniform4f(
        programInfoRef.current.uniformLocations.primaryColor,
        ...primaryColor,
        1.0,
      );

      gl.enableVertexAttribArray(
        programInfoRef.current.attribLocations.vertexPosition,
      );
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferRef.current);
      gl.vertexAttribPointer(
        programInfoRef.current.attribLocations.vertexPosition,
        2,
        gl.FLOAT,
        false,
        0,
        0,
      );

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    if (initWebGL()) {
      animationFrameRef.current = requestAnimationFrame(render);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-screen w-screen"
      style={{ display: "block" }}
    />
  );
};

export default GradientBackground;
