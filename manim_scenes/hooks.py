"""
Manim hook animations for NeuroMathica lessons.
Render all: python3 -m manim render -qm --format webm manim_scenes/hooks.py -a
Render one: python3 -m manim render -qm --format webm manim_scenes/hooks.py PlaceValueHook
"""
from manim import *

BG = "#0f172a"
INDIGO = "#818cf8"
CYAN = "#22d3ee"
EMERALD = "#34d399"
AMBER = "#fbbf24"
ROSE = "#fb7185"
VIOLET = "#a78bfa"
BLUE = "#60a5fa"
SURFACE = "#334155"
TEXT_PRIMARY = "#f1f5f9"
TEXT_SECONDARY = "#94a3b8"


class PlaceValueHook(Scene):
    """NO-1.1: Number 3,456 explodes into place-value columns."""
    def construct(self):
        self.camera.background_color = BG
        colors = [VIOLET, BLUE, CYAN, EMERALD]

        number = Text("3,456", font_size=96, color=WHITE, font="Arial")
        self.play(Write(number), run_time=1)
        self.wait(0.5)

        digits = VGroup(*[
            Text(d, font_size=80, color=colors[i], font="Arial")
            for i, d in enumerate(["3", "4", "5", "6"])
        ])
        labels = VGroup(*[
            Text(l, font_size=22, color=colors[i], font="Arial")
            for i, l in enumerate(["THOUSANDS", "HUNDREDS", "TENS", "ONES"])
        ])
        values = VGroup(*[
            Text(v, font_size=36, color=colors[i], font="Arial")
            for i, v in enumerate(["3,000", "400", "50", "6"])
        ])

        for i in range(4):
            x = LEFT * 3 + RIGHT * i * 2
            digits[i].move_to(x + UP * 0.3)
            labels[i].move_to(x + UP * 2)
            values[i].move_to(x + DOWN * 1.2)

        self.play(
            FadeOut(number),
            *[FadeIn(d, shift=UP) for d in digits],
            *[FadeIn(l, shift=DOWN * 0.3) for l in labels],
            run_time=1.2
        )
        self.play(*[FadeIn(v, shift=UP * 0.3) for v in values], run_time=0.8)
        self.wait(0.3)

        eq = Text("3,000 + 400 + 50 + 6 = 3,456", font_size=36, color=TEXT_PRIMARY, font="Arial")
        eq.move_to(DOWN * 2.8)
        self.play(Write(eq), run_time=1)
        self.wait(0.5)


class IntegersHook(Scene):
    """NO-1.2: Thermometer dropping below zero."""
    def construct(self):
        self.camera.background_color = BG

        # Thermometer
        tube = RoundedRectangle(width=0.6, height=4, corner_radius=0.3, color=TEXT_SECONDARY)
        bulb = Circle(radius=0.5, color=TEXT_SECONDARY).move_to(tube.get_bottom() + DOWN * 0.3)
        therm = VGroup(tube, bulb).move_to(ORIGIN)

        # Mercury fill
        mercury = Rectangle(width=0.35, height=3, color=RED_C, fill_opacity=1)
        mercury.move_to(tube.get_bottom() + UP * 1.5)

        # Temperature text
        temp_text = Text("5°C", font_size=48, color=AMBER, font="Arial")
        temp_text.next_to(therm, RIGHT, buff=1)

        self.play(FadeIn(therm), FadeIn(mercury), Write(temp_text))
        self.wait(0.3)

        # Drop temperature
        for t in [4, 3, 2, 1, 0]:
            new_text = Text(f"{t}°C", font_size=48, color=AMBER if t > 0 else WHITE, font="Arial")
            new_text.next_to(therm, RIGHT, buff=1)
            new_h = max(0.3, 3 * t / 5)
            new_mercury = Rectangle(width=0.35, height=new_h, color=RED_C if t > 0 else BLUE, fill_opacity=1)
            new_mercury.move_to(tube.get_bottom() + UP * new_h / 2)
            self.play(
                Transform(mercury, new_mercury),
                Transform(temp_text, new_text),
                run_time=0.3
            )

        # Dramatic pause at zero
        zero_label = Text("What happens next?", font_size=32, color=CYAN, font="Arial")
        zero_label.move_to(UP * 3)
        self.play(Write(zero_label), run_time=0.8)
        self.wait(0.5)

        # Go negative
        for t in [-1, -2, -3, -4, -5]:
            new_text = Text(f"{t}°C", font_size=48, color=BLUE, font="Arial")
            new_text.next_to(therm, RIGHT, buff=1)
            self.play(Transform(temp_text, new_text), run_time=0.25)

        self.wait(0.5)


class AnglesHook(Scene):
    """GE-4.1: Clock hands sweeping showing angle measurement."""
    def construct(self):
        self.camera.background_color = BG

        # Clock face
        clock = Circle(radius=2.5, color=TEXT_SECONDARY, stroke_width=2)
        center_dot = Dot(ORIGIN, radius=0.08, color=AMBER)

        # Hour marks
        marks = VGroup()
        for i in range(12):
            angle = i * 30 * DEGREES
            start = 2.2 * np.array([np.sin(angle), np.cos(angle), 0])
            end = 2.5 * np.array([np.sin(angle), np.cos(angle), 0])
            marks.add(Line(start, end, stroke_width=2, color=TEXT_SECONDARY))

        # Hour hand (fixed at 12)
        hour_hand = Line(ORIGIN, UP * 1.5, stroke_width=4, color=TEXT_SECONDARY)

        # Minute hand (will sweep)
        minute_hand = Line(ORIGIN, RIGHT * 2, stroke_width=3, color=BLUE)

        self.play(FadeIn(clock), FadeIn(marks), FadeIn(center_dot))
        self.play(FadeIn(hour_hand), FadeIn(minute_hand))

        # Sweep from 3:00 (0°) around full circle
        degree_text = Text("90°", font_size=48, color=AMBER, font="Arial")
        degree_text.move_to(DOWN * 3.2)
        self.play(Write(degree_text))

        # Animate sweep
        for deg, label in [(180, "180°"), (270, "270°"), (360, "360°")]:
            new_hand = Line(ORIGIN, 2 * np.array([
                np.cos((90 - deg) * DEGREES),
                np.sin((90 - deg) * DEGREES), 0
            ]), stroke_width=3, color=BLUE)
            new_label = Text(label, font_size=48, color=AMBER, font="Arial")
            new_label.move_to(DOWN * 3.2)
            self.play(
                Transform(minute_hand, new_hand),
                Transform(degree_text, new_label),
                run_time=0.8
            )
            self.wait(0.2)

        msg = Text("Angles measure ROTATION", font_size=36, color=CYAN, font="Arial")
        msg.move_to(DOWN * 3.2)
        self.play(Transform(degree_text, msg))
        self.wait(0.5)


class FractionsHook(Scene):
    """NO-1.4: Pizza slicing from whole to eighths."""
    def construct(self):
        self.camera.background_color = BG

        # Pizza (circle)
        pizza = Circle(radius=2, color=AMBER, fill_color="#92400e", fill_opacity=0.6, stroke_width=3)
        label = Text("1 whole", font_size=32, color=TEXT_PRIMARY, font="Arial").move_to(DOWN * 3)

        self.play(FadeIn(pizza), Write(label))
        self.wait(0.3)

        # Cut in half
        cut1 = Line(UP * 2, DOWN * 2, color=WHITE, stroke_width=2)
        new_label = Text("1/2", font_size=48, color=INDIGO, font="Arial").move_to(DOWN * 3)
        self.play(Create(cut1), Transform(label, new_label), run_time=0.6)
        self.wait(0.3)

        # Cut in quarters
        cut2 = Line(LEFT * 2, RIGHT * 2, color=WHITE, stroke_width=2)
        new_label2 = Text("1/4", font_size=48, color=INDIGO, font="Arial").move_to(DOWN * 3)
        self.play(Create(cut2), Transform(label, new_label2), run_time=0.6)
        self.wait(0.3)

        # Cut in eighths
        cut3 = Line(
            2 * np.array([np.cos(45 * DEGREES), np.sin(45 * DEGREES), 0]),
            2 * np.array([np.cos(225 * DEGREES), np.sin(225 * DEGREES), 0]),
            color=WHITE, stroke_width=2
        )
        cut4 = Line(
            2 * np.array([np.cos(135 * DEGREES), np.sin(135 * DEGREES), 0]),
            2 * np.array([np.cos(315 * DEGREES), np.sin(315 * DEGREES), 0]),
            color=WHITE, stroke_width=2
        )
        new_label3 = Text("1/8", font_size=48, color=INDIGO, font="Arial").move_to(DOWN * 3)
        self.play(Create(cut3), Create(cut4), Transform(label, new_label3), run_time=0.6)
        self.wait(0.3)

        # Key insight
        insight = Text("More cuts = smaller pieces!", font_size=36, color=CYAN, font="Arial")
        insight.move_to(DOWN * 3)
        self.play(Transform(label, insight))
        self.wait(0.5)


class PythagoreanHook(Scene):
    """GE-4.3: Visual proof with squares on triangle sides."""
    def construct(self):
        self.camera.background_color = BG

        # 3-4-5 right triangle
        tri = Polygon(
            ORIGIN, RIGHT * 4, RIGHT * 4 + UP * 3,
            color=INDIGO, fill_opacity=0.15, stroke_width=2
        ).shift(LEFT * 2 + DOWN * 1)

        # Squares on each side
        sq_a = Square(side_length=4, color=BLUE, fill_opacity=0.1, stroke_width=2)
        sq_a.next_to(tri, DOWN, buff=0).align_to(tri, LEFT)

        sq_b = Square(side_length=3, color=EMERALD, fill_opacity=0.1, stroke_width=2)
        sq_b.next_to(tri, RIGHT, buff=0).align_to(tri, DOWN)

        # Labels
        a_label = Text("a² = 16", font_size=28, color=BLUE, font="Arial").move_to(sq_a)
        b_label = Text("b² = 9", font_size=28, color=EMERALD, font="Arial").move_to(sq_b)

        self.play(Create(tri), run_time=0.8)
        self.play(FadeIn(sq_a), FadeIn(a_label), run_time=0.6)
        self.play(FadeIn(sq_b), FadeIn(b_label), run_time=0.6)
        self.wait(0.3)

        # Result
        eq = Text("a² + b² = c²", font_size=48, color=AMBER, font="Arial")
        eq.move_to(UP * 3)
        result = Text("16 + 9 = 25", font_size=36, color=TEXT_PRIMARY, font="Arial")
        result.move_to(UP * 2.2)
        self.play(Write(eq), run_time=0.8)
        self.play(Write(result), run_time=0.6)
        self.wait(0.5)
