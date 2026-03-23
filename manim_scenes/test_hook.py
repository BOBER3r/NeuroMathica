"""Test Manim scene — no LaTeX required."""
from manim import *

class PlaceValueHook(Scene):
    def construct(self):
        self.camera.background_color = "#0f172a"

        # The number appears
        number = Text("3,456", font_size=96, color=WHITE, font="Arial")
        self.play(Write(number), run_time=1)
        self.wait(0.5)

        # Split into digits
        colors = ["#a78bfa", "#60a5fa", "#22d3ee", "#34d399"]
        digits = VGroup(
            Text("3", font_size=72, color=colors[0], font="Arial"),
            Text("4", font_size=72, color=colors[1], font="Arial"),
            Text("5", font_size=72, color=colors[2], font="Arial"),
            Text("6", font_size=72, color=colors[3], font="Arial"),
        )
        for i, d in enumerate(digits):
            d.move_to(LEFT * 3 + RIGHT * i * 2 + UP * 0.5)

        labels = VGroup(
            Text("Thousands", font_size=24, color=colors[0], font="Arial"),
            Text("Hundreds", font_size=24, color=colors[1], font="Arial"),
            Text("Tens", font_size=24, color=colors[2], font="Arial"),
            Text("Ones", font_size=24, color=colors[3], font="Arial"),
        )
        for i, l in enumerate(labels):
            l.move_to(LEFT * 3 + RIGHT * i * 2 + UP * 2)

        values = VGroup(
            Text("3,000", font_size=36, color=colors[0], font="Arial"),
            Text("400", font_size=36, color=colors[1], font="Arial"),
            Text("50", font_size=36, color=colors[2], font="Arial"),
            Text("6", font_size=36, color=colors[3], font="Arial"),
        )
        for i, v in enumerate(values):
            v.move_to(LEFT * 3 + RIGHT * i * 2 + DOWN * 1)

        self.play(
            FadeOut(number),
            *[FadeIn(d, shift=UP * 0.5) for d in digits],
            *[FadeIn(l, shift=DOWN * 0.3) for l in labels],
            run_time=1.5
        )
        self.wait(0.3)
        self.play(*[FadeIn(v, shift=UP * 0.3) for v in values], run_time=1)
        self.wait(0.5)

        # Equation without LaTeX
        eq = Text("3,000 + 400 + 50 + 6 = 3,456", font_size=40, color=WHITE, font="Arial")
        eq.move_to(DOWN * 2.5)
        self.play(Write(eq), run_time=1.5)
        self.wait(1)
