"""
Manim hook animations for NeuroMathica lessons — Batch 2 (36 scenes).
Render all: python3 -m manim render -qm --format webm manim_scenes/hooks_batch2.py -a
Render one: python3 -m manim render -qm --format webm manim_scenes/hooks_batch2.py DecimalsHook
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


def add_number_labels(number_line, x_range_start, x_range_end, step,
                      font_size=24, color=TEXT_PRIMARY, direction=DOWN,
                      buff=0.2, decimal_places=0):
    """Add Text labels to a NumberLine (avoids LaTeX)."""
    labels = VGroup()
    x = x_range_start
    while x <= x_range_end + step * 0.01:
        if decimal_places == 0:
            txt = str(int(round(x)))
        else:
            txt = f"{x:.{decimal_places}f}"
        lbl = Text(txt, font_size=font_size, color=color, font="Arial")
        lbl.next_to(number_line.n2p(x), direction, buff=buff)
        labels.add(lbl)
        x += step
    return labels


def add_axes_labels(axes, x_range, y_range, font_size=16, color=TEXT_PRIMARY):
    """Add Text labels to Axes x and y ticks (avoids LaTeX)."""
    labels = VGroup()
    x_start, x_end, x_step = x_range
    y_start, y_end, y_step = y_range
    x = x_start
    while x <= x_end + x_step * 0.01:
        val = int(round(x)) if x == int(round(x)) else x
        lbl = Text(str(val), font_size=font_size, color=color, font="Arial")
        lbl.next_to(axes.c2p(x, 0), DOWN, buff=0.15)
        labels.add(lbl)
        x += x_step
    y = y_start
    while y <= y_end + y_step * 0.01:
        val = int(round(y)) if y == int(round(y)) else y
        lbl = Text(str(val), font_size=font_size, color=color, font="Arial")
        lbl.next_to(axes.c2p(0, y), LEFT, buff=0.15)
        labels.add(lbl)
        y += y_step
    return labels


# ============================================================
# Numbers & Operations (1–14)
# ============================================================

class DecimalsHook(Scene):
    """Zoom into number line between 0 and 1, revealing infinite decimals."""
    def construct(self):
        self.camera.background_color = BG

        # Wide number line 0..1
        nl = NumberLine(x_range=[0, 1, 0.1], length=10, color=TEXT_SECONDARY,
                        include_numbers=False)
        nl.move_to(ORIGIN)
        nl_labels = add_number_labels(nl, 0, 1, 0.1, font_size=28, color=TEXT_PRIMARY, decimal_places=1)
        self.play(Create(nl), FadeIn(nl_labels), run_time=1)
        self.wait(0.4)

        # Highlight segment 0.3–0.4
        brace = Brace(Line(nl.n2p(0.3), nl.n2p(0.4)), DOWN, color=AMBER)
        zoom_label = Text("Zoom in!", font_size=28, color=AMBER, font="Arial").next_to(brace, DOWN, buff=0.2)
        self.play(FadeIn(brace), Write(zoom_label), run_time=0.6)
        self.wait(0.3)

        # Zoom: replace with 0.30..0.40 line
        self.play(FadeOut(nl), FadeOut(nl_labels), FadeOut(brace), FadeOut(zoom_label), run_time=0.5)

        nl2 = NumberLine(x_range=[0.30, 0.40, 0.01], length=10, color=TEXT_SECONDARY,
                         include_numbers=False)
        nl2.move_to(ORIGIN)
        nl2_labels = add_number_labels(nl2, 0.30, 0.40, 0.01, font_size=24, color=TEXT_PRIMARY, decimal_places=2)
        self.play(Create(nl2), FadeIn(nl2_labels), run_time=0.8)
        self.wait(0.3)

        # Highlight 0.31..0.32
        brace2 = Brace(Line(nl2.n2p(0.31), nl2.n2p(0.32)), DOWN, color=CYAN)
        zoom_label2 = Text("Zoom more!", font_size=28, color=CYAN, font="Arial").next_to(brace2, DOWN, buff=0.2)
        self.play(FadeIn(brace2), Write(zoom_label2), run_time=0.5)
        self.wait(0.3)

        # Insight
        insight = Text("Infinite numbers between any two numbers!", font_size=32, color=EMERALD, font="Arial")
        insight.move_to(DOWN * 2.8)
        self.play(Write(insight), run_time=1)
        self.wait(0.5)


class FractionOpsHook(Scene):
    """Show 1/2 + 1/3: wrong answer (2/5) vs correct (5/6) with bars."""
    def construct(self):
        self.camera.background_color = BG

        title = Text("1/2 + 1/3 = ?", font_size=56, color=TEXT_PRIMARY, font="Arial")
        title.move_to(UP * 3)
        self.play(Write(title), run_time=0.8)

        # Wrong approach
        wrong_label = Text("Wrong: 2/5", font_size=32, color=ROSE, font="Arial").move_to(UP * 1.5 + LEFT * 3)
        wrong_bar_bg = Rectangle(width=5, height=0.5, color=SURFACE, fill_opacity=0.3, stroke_width=1).move_to(UP * 0.8 + LEFT * 3)
        wrong_bar = Rectangle(width=5 * 0.4, height=0.5, color=ROSE, fill_opacity=0.6, stroke_width=0).align_to(wrong_bar_bg, LEFT).move_to(wrong_bar_bg.get_left() + RIGHT * 5 * 0.2)
        wrong_bar.align_to(wrong_bar_bg, LEFT)
        self.play(Write(wrong_label), FadeIn(wrong_bar_bg), run_time=0.5)
        self.play(FadeIn(wrong_bar), run_time=0.4)

        # Correct approach
        correct_label = Text("Correct: 5/6", font_size=32, color=EMERALD, font="Arial").move_to(UP * 1.5 + RIGHT * 3)
        correct_bar_bg = Rectangle(width=5, height=0.5, color=SURFACE, fill_opacity=0.3, stroke_width=1).move_to(UP * 0.8 + RIGHT * 3)
        correct_bar = Rectangle(width=5 * (5/6), height=0.5, color=EMERALD, fill_opacity=0.6, stroke_width=0)
        correct_bar.align_to(correct_bar_bg, LEFT)
        self.play(Write(correct_label), FadeIn(correct_bar_bg), run_time=0.5)
        self.play(FadeIn(correct_bar), run_time=0.4)

        # Show common denominator bars below
        cd_label = Text("Common denominator: sixths", font_size=28, color=CYAN, font="Arial").move_to(DOWN * 0.3)
        self.play(Write(cd_label), run_time=0.6)

        # 1/2 = 3/6 bar
        half_label = Text("1/2 = 3/6", font_size=24, color=BLUE, font="Arial").move_to(DOWN * 1.2 + LEFT * 2)
        half_bar = Rectangle(width=3, height=0.4, color=BLUE, fill_opacity=0.5).move_to(DOWN * 1.8 + LEFT * 2)

        # 1/3 = 2/6 bar
        third_label = Text("1/3 = 2/6", font_size=24, color=VIOLET, font="Arial").move_to(DOWN * 1.2 + RIGHT * 2)
        third_bar = Rectangle(width=2, height=0.4, color=VIOLET, fill_opacity=0.5).move_to(DOWN * 1.8 + RIGHT * 2)

        self.play(Write(half_label), FadeIn(half_bar), Write(third_label), FadeIn(third_bar), run_time=0.6)

        result = Text("3/6 + 2/6 = 5/6", font_size=36, color=AMBER, font="Arial").move_to(DOWN * 2.8)
        self.play(Write(result), run_time=0.8)
        self.wait(0.5)


class IntegerMultDivHook(Scene):
    """Pattern table showing 3x? revealing why negative times positive is negative."""
    def construct(self):
        self.camera.background_color = BG

        title = Text("Spot the pattern...", font_size=36, color=CYAN, font="Arial").move_to(UP * 3.2)
        self.play(Write(title), run_time=0.6)

        entries = [
            ("3 x  2 = ", " 6", EMERALD),
            ("3 x  1 = ", " 3", EMERALD),
            ("3 x  0 = ", " 0", AMBER),
            ("3 x -1 = ", "-3", ROSE),
            ("3 x -2 = ", "-6", ROSE),
        ]
        left_texts = VGroup()
        right_texts = VGroup()
        for i, (left, right, color) in enumerate(entries):
            y = UP * 1.5 + DOWN * i * 0.9
            lt = Text(left, font_size=40, color=TEXT_PRIMARY, font="Arial").move_to(LEFT * 1 + y)
            rt = Text(right, font_size=40, color=color, font="Arial").next_to(lt, RIGHT, buff=0.1)
            left_texts.add(lt)
            right_texts.add(rt)

        # Show equations one by one, first three with answers
        for i in range(3):
            self.play(Write(left_texts[i]), run_time=0.3)
            self.play(FadeIn(right_texts[i], shift=LEFT * 0.3), run_time=0.3)

        # Show question marks for last two
        q1 = Text("?", font_size=40, color=AMBER, font="Arial").move_to(right_texts[3])
        q2 = Text("?", font_size=40, color=AMBER, font="Arial").move_to(right_texts[4])
        self.play(Write(left_texts[3]), FadeIn(q1), run_time=0.4)
        self.play(Write(left_texts[4]), FadeIn(q2), run_time=0.4)
        self.wait(0.4)

        # Pattern arrow
        pattern = Text("-3 each time!", font_size=28, color=VIOLET, font="Arial").move_to(RIGHT * 3.5 + UP * 0.6)
        arrow = Arrow(RIGHT * 3.5 + UP * 1.5, RIGHT * 3.5 + DOWN * 1, color=VIOLET, stroke_width=2)
        self.play(Write(pattern), Create(arrow), run_time=0.6)

        # Reveal answers
        self.play(FadeOut(q1), FadeIn(right_texts[3], shift=LEFT * 0.3), run_time=0.4)
        self.play(FadeOut(q2), FadeIn(right_texts[4], shift=LEFT * 0.3), run_time=0.4)
        self.wait(0.5)


class RatiosHook(Scene):
    """Two groups of colored dots scaling up: 3:5 -> 6:10 -> 9:15."""
    def construct(self):
        self.camera.background_color = BG

        def make_dots(n_blue, n_red, center):
            dots = VGroup()
            for i in range(n_blue):
                row, col = divmod(i, 5)
                dots.add(Dot(center + LEFT * 2 + RIGHT * col * 0.45 + DOWN * row * 0.45, radius=0.15, color=BLUE))
            for i in range(n_red):
                row, col = divmod(i, 5)
                dots.add(Dot(center + RIGHT * 1.5 + RIGHT * col * 0.45 + DOWN * row * 0.45, radius=0.15, color=ROSE))
            return dots

        title = Text("For every 3 blue, there are 5 red", font_size=30, color=TEXT_PRIMARY, font="Arial")
        title.move_to(UP * 3)
        self.play(Write(title), run_time=0.7)

        # 3:5
        dots1 = make_dots(3, 5, UP * 1.5)
        ratio1 = Text("3 : 5", font_size=44, color=AMBER, font="Arial").move_to(DOWN * 0.5)
        self.play(FadeIn(dots1, lag_ratio=0.1), Write(ratio1), run_time=0.8)
        self.wait(0.4)

        # Scale to 6:10
        self.play(FadeOut(dots1), FadeOut(ratio1), run_time=0.3)
        dots2 = make_dots(6, 10, UP * 1)
        ratio2 = Text("6 : 10", font_size=44, color=AMBER, font="Arial").move_to(DOWN * 1)
        scale_label = Text("x2", font_size=36, color=CYAN, font="Arial").move_to(DOWN * 1.8)
        self.play(FadeIn(dots2, lag_ratio=0.05), Write(ratio2), Write(scale_label), run_time=0.8)
        self.wait(0.4)

        # Scale to 9:15
        self.play(FadeOut(dots2), FadeOut(ratio2), FadeOut(scale_label), run_time=0.3)
        dots3 = make_dots(9, 15, UP * 0.5)
        ratio3 = Text("9 : 15", font_size=44, color=AMBER, font="Arial").move_to(DOWN * 1.8)
        scale_label2 = Text("x3", font_size=36, color=CYAN, font="Arial").move_to(DOWN * 2.5)
        self.play(FadeIn(dots3, lag_ratio=0.03), Write(ratio3), Write(scale_label2), run_time=0.8)

        insight = Text("Same ratio, different amounts!", font_size=32, color=EMERALD, font="Arial").move_to(DOWN * 3.2)
        self.play(Write(insight), run_time=0.6)
        self.wait(0.5)


class ProportionsHook(Scene):
    """Photo stretching vs scaling — same ratio = same shape."""
    def construct(self):
        self.camera.background_color = BG

        # Original "photo" (rectangle with icon inside)
        orig = Rectangle(width=3, height=2, color=BLUE, fill_opacity=0.15, stroke_width=2).move_to(UP * 1)
        orig_face = Text(":)", font_size=48, color=BLUE, font="Arial").move_to(orig)
        orig_label = Text("Original: 3 x 2", font_size=24, color=TEXT_SECONDARY, font="Arial").next_to(orig, DOWN, buff=0.3)
        self.play(FadeIn(orig), Write(orig_face), Write(orig_label), run_time=0.7)
        self.wait(0.3)

        # Stretched version (distorted)
        stretched = Rectangle(width=5, height=2, color=ROSE, fill_opacity=0.15, stroke_width=2).move_to(DOWN * 2 + LEFT * 2.5)
        stretched_face = Text(":)", font_size=48, color=ROSE, font="Arial").move_to(stretched)
        stretched_face.stretch(5/3, 0)
        stretched_label = Text("Stretched: 5 x 2", font_size=22, color=ROSE, font="Arial").next_to(stretched, DOWN, buff=0.2)
        cross = Text("X", font_size=48, color=ROSE, font="Arial").next_to(stretched, RIGHT, buff=0.3)

        self.play(FadeIn(stretched), Write(stretched_face), Write(stretched_label), run_time=0.5)
        self.play(FadeIn(cross, scale=1.5), run_time=0.3)

        # Properly scaled version
        scaled = Rectangle(width=4.5, height=3, color=EMERALD, fill_opacity=0.15, stroke_width=2).move_to(DOWN * 2 + RIGHT * 3)
        scaled_face = Text(":)", font_size=60, color=EMERALD, font="Arial").move_to(scaled)
        scaled_label = Text("Scaled: 4.5 x 3", font_size=22, color=EMERALD, font="Arial").next_to(scaled, DOWN, buff=0.2)
        check = Text("OK", font_size=40, color=EMERALD, font="Arial").next_to(scaled, RIGHT, buff=0.3)

        self.play(FadeIn(scaled), Write(scaled_face), Write(scaled_label), run_time=0.5)
        self.play(FadeIn(check, scale=1.5), run_time=0.3)

        insight = Text("Same ratio = same shape!", font_size=36, color=AMBER, font="Arial").move_to(UP * 3)
        self.play(Write(insight), run_time=0.7)
        self.wait(0.5)


class PercentsHook(Scene):
    """10x10 grid with 45 cells shaded = 45% = 45/100 = 0.45."""
    def construct(self):
        self.camera.background_color = BG

        # 10x10 grid
        cells = VGroup()
        for r in range(10):
            for c in range(10):
                cell = Square(side_length=0.4, color=TEXT_SECONDARY, stroke_width=1, fill_opacity=0)
                cell.move_to(LEFT * 2.5 + RIGHT * c * 0.42 + UP * 2 + DOWN * r * 0.42)
                cells.add(cell)

        self.play(FadeIn(cells, lag_ratio=0.005), run_time=0.8)

        # Shade 45 cells
        shaded = VGroup(*cells[:45])
        self.play(
            *[c.animate.set_fill(INDIGO, opacity=0.7) for c in shaded],
            run_time=1.2
        )
        self.wait(0.3)

        # Show all three representations
        pct = Text("45%", font_size=56, color=INDIGO, font="Arial").move_to(RIGHT * 3.5 + UP * 1)
        frac = Text("= 45/100", font_size=40, color=CYAN, font="Arial").move_to(RIGHT * 3.5)
        dec = Text("= 0.45", font_size=40, color=EMERALD, font="Arial").move_to(RIGHT * 3.5 + DOWN * 1)

        self.play(Write(pct), run_time=0.5)
        self.play(Write(frac), run_time=0.5)
        self.play(Write(dec), run_time=0.5)

        insight = Text("Three ways to say the same thing!", font_size=30, color=AMBER, font="Arial")
        insight.move_to(DOWN * 3)
        self.play(Write(insight), run_time=0.7)
        self.wait(0.5)


class PercentAppsHook(Scene):
    """Sneaker price $80 -> 25% off -> $60 with discount bar animation."""
    def construct(self):
        self.camera.background_color = BG

        # Price tag
        tag = RoundedRectangle(width=4, height=2.5, corner_radius=0.3, color=TEXT_SECONDARY, fill_opacity=0.1)
        tag.move_to(UP * 1)
        price = Text("$80", font_size=64, color=TEXT_PRIMARY, font="Arial").move_to(tag)
        shoe_label = Text("Sneakers", font_size=24, color=TEXT_SECONDARY, font="Arial").next_to(tag, UP, buff=0.2)
        self.play(FadeIn(tag), Write(price), Write(shoe_label), run_time=0.7)
        self.wait(0.3)

        # Discount badge
        badge = Text("25% OFF!", font_size=36, color=ROSE, font="Arial").move_to(tag.get_corner(UR) + LEFT * 0.8 + DOWN * 0.3)
        self.play(FadeIn(badge, scale=1.5), run_time=0.5)

        # Strikethrough original price
        strike = Line(price.get_left(), price.get_right(), color=ROSE, stroke_width=3)
        self.play(Create(strike), run_time=0.3)

        # Discount bar
        bar_bg = Rectangle(width=6, height=0.6, color=SURFACE, fill_opacity=0.3).move_to(DOWN * 1.2)
        bar_full = Rectangle(width=6, height=0.6, color=EMERALD, fill_opacity=0.5, stroke_width=0)
        bar_full.align_to(bar_bg, LEFT)
        bar_discount = Rectangle(width=6 * 0.25, height=0.6, color=ROSE, fill_opacity=0.5, stroke_width=0)
        bar_discount.align_to(bar_bg, RIGHT)

        self.play(FadeIn(bar_bg), run_time=0.2)
        self.play(FadeIn(bar_full), run_time=0.3)
        self.play(FadeIn(bar_discount), run_time=0.4)

        pay_label = Text("You pay: 75%", font_size=22, color=EMERALD, font="Arial").move_to(DOWN * 1.2 + LEFT * 1.3)
        save_label = Text("Save: 25%", font_size=22, color=ROSE, font="Arial").move_to(DOWN * 1.2 + RIGHT * 2.3)
        self.play(Write(pay_label), Write(save_label), run_time=0.4)

        # Calculation
        calc = Text("$80 x 0.75 = $60", font_size=36, color=AMBER, font="Arial").move_to(DOWN * 2.3)
        new_price = Text("$60", font_size=64, color=EMERALD, font="Arial").move_to(tag.get_center() + DOWN * 0.05)
        self.play(Write(calc), FadeIn(new_price), run_time=0.8)
        self.wait(0.5)


class RationalNumbersHook(Scene):
    """Three number neighborhoods merge onto one number line."""
    def construct(self):
        self.camera.background_color = BG

        # Three separate bubbles
        int_circle = RoundedRectangle(width=3.2, height=1.8, corner_radius=0.4, color=BLUE, fill_opacity=0.1).move_to(LEFT * 4 + UP * 1)
        int_label = Text("Integers", font_size=24, color=BLUE, font="Arial").next_to(int_circle, UP, buff=0.1)
        int_examples = Text("-3, -1, 0, 2", font_size=22, color=BLUE, font="Arial").move_to(int_circle)

        frac_circle = RoundedRectangle(width=3.2, height=1.8, corner_radius=0.4, color=VIOLET, fill_opacity=0.1).move_to(UP * 1)
        frac_label = Text("Fractions", font_size=24, color=VIOLET, font="Arial").next_to(frac_circle, UP, buff=0.1)
        frac_examples = Text("1/2, 3/4, -2/5", font_size=22, color=VIOLET, font="Arial").move_to(frac_circle)

        dec_circle = RoundedRectangle(width=3.2, height=1.8, corner_radius=0.4, color=EMERALD, fill_opacity=0.1).move_to(RIGHT * 4 + UP * 1)
        dec_label = Text("Decimals", font_size=24, color=EMERALD, font="Arial").next_to(dec_circle, UP, buff=0.1)
        dec_examples = Text("0.5, 1.75, -0.4", font_size=22, color=EMERALD, font="Arial").move_to(dec_circle)

        self.play(
            FadeIn(int_circle), Write(int_label), Write(int_examples),
            FadeIn(frac_circle), Write(frac_label), Write(frac_examples),
            FadeIn(dec_circle), Write(dec_label), Write(dec_examples),
            run_time=1
        )
        self.wait(0.5)

        # Merge to number line
        nl = NumberLine(x_range=[-3, 3, 1], length=10, color=TEXT_SECONDARY,
                        include_numbers=False)
        nl.move_to(DOWN * 1.5)
        nl_labels = add_number_labels(nl, -3, 3, 1, font_size=24, color=TEXT_PRIMARY)

        # Points
        pts = VGroup(
            Dot(nl.n2p(-1), color=BLUE, radius=0.1),
            Dot(nl.n2p(0.5), color=VIOLET, radius=0.1),
            Dot(nl.n2p(1.75), color=EMERALD, radius=0.1),
            Dot(nl.n2p(-0.4), color=EMERALD, radius=0.1),
            Dot(nl.n2p(0.75), color=VIOLET, radius=0.1),
            Dot(nl.n2p(2), color=BLUE, radius=0.1),
        )

        self.play(
            FadeOut(int_circle), FadeOut(int_label), FadeOut(int_examples),
            FadeOut(frac_circle), FadeOut(frac_label), FadeOut(frac_examples),
            FadeOut(dec_circle), FadeOut(dec_label), FadeOut(dec_examples),
            Create(nl), FadeIn(nl_labels),
            run_time=0.8
        )
        self.play(FadeIn(pts, lag_ratio=0.15), run_time=0.6)

        insight = Text("All rational numbers live on ONE number line!", font_size=30, color=AMBER, font="Arial")
        insight.move_to(DOWN * 3.2)
        self.play(Write(insight), run_time=0.8)
        self.wait(0.5)


class RationalOpsHook(Scene):
    """Mixed operation: -2/3 + 1.5 — convert and compute."""
    def construct(self):
        self.camera.background_color = BG

        problem = Text("-2/3 + 1.5 = ?", font_size=52, color=TEXT_PRIMARY, font="Arial")
        problem.move_to(UP * 2.5)
        self.play(Write(problem), run_time=0.8)
        self.wait(0.3)

        # Step 1: Convert 1.5 to fraction
        step1 = Text("1.5 = 3/2", font_size=36, color=CYAN, font="Arial").move_to(UP * 1)
        self.play(Write(step1), run_time=0.6)

        # Step 2: Common denominator
        step2 = Text("-2/3 + 3/2", font_size=36, color=TEXT_PRIMARY, font="Arial").move_to(UP * 0.1)
        self.play(Write(step2), run_time=0.5)

        step3 = Text("-4/6 + 9/6", font_size=36, color=VIOLET, font="Arial").move_to(DOWN * 0.8)
        cd_note = Text("(common denominator: 6)", font_size=22, color=TEXT_SECONDARY, font="Arial").next_to(step3, RIGHT, buff=0.3)
        self.play(Write(step3), Write(cd_note), run_time=0.6)

        # Step 3: Result
        result = Text("= 5/6", font_size=52, color=EMERALD, font="Arial").move_to(DOWN * 2)
        box = SurroundingRectangle(result, color=EMERALD, buff=0.2)
        self.play(Write(result), Create(box), run_time=0.8)
        self.wait(0.5)


class IrrationalNumbersHook(Scene):
    """Pi digits cascading: never repeating, never ending."""
    def construct(self):
        self.camera.background_color = BG

        pi_symbol = Text("pi", font_size=96, color=INDIGO, font="Arial")
        pi_symbol.move_to(UP * 2)
        self.play(Write(pi_symbol), run_time=0.6)

        equals = Text("=", font_size=60, color=TEXT_PRIMARY, font="Arial")
        equals.move_to(UP * 0.5)
        self.play(Write(equals), run_time=0.3)

        digits = "3.14159265358979323846264338327950288..."
        chunks = [digits[:6], digits[6:14], digits[14:22], digits[22:30], digits[30:]]
        positions = [ORIGIN, DOWN * 0.8, DOWN * 1.6, DOWN * 2.4, DOWN * 3.2]
        colors = [AMBER, CYAN, EMERALD, VIOLET, BLUE]

        for i, (chunk, pos, color) in enumerate(zip(chunks, positions, colors)):
            text = Text(chunk, font_size=36, color=color, font="Arial").move_to(pos)
            self.play(Write(text), run_time=0.6)

        # Insight
        insight = Text("Never repeats. Never ends.", font_size=32, color=ROSE, font="Arial")
        insight.move_to(UP * 3.2)
        self.play(Write(insight), run_time=0.7)
        self.wait(0.5)


class SquareRootsHook(Scene):
    """Square with area 9 -> side=3. Square with area 2 -> side=sqrt(2) (irrational!)."""
    def construct(self):
        self.camera.background_color = BG

        # Perfect square: area 9
        sq1 = Square(side_length=2.5, color=BLUE, fill_opacity=0.15, stroke_width=2).move_to(LEFT * 3 + UP * 0.5)
        area1 = Text("Area = 9", font_size=28, color=BLUE, font="Arial").move_to(sq1)
        side1 = Text("side = 3", font_size=24, color=EMERALD, font="Arial").next_to(sq1, DOWN, buff=0.3)
        label1 = Text("Perfect!", font_size=22, color=EMERALD, font="Arial").next_to(side1, DOWN, buff=0.15)

        self.play(FadeIn(sq1), Write(area1), run_time=0.6)
        self.play(Write(side1), Write(label1), run_time=0.5)
        self.wait(0.3)

        # Non-perfect square: area 2
        sq2 = Square(side_length=2.5, color=VIOLET, fill_opacity=0.15, stroke_width=2).move_to(RIGHT * 3 + UP * 0.5)
        area2 = Text("Area = 2", font_size=28, color=VIOLET, font="Arial").move_to(sq2)
        side2 = Text("side = ?", font_size=24, color=AMBER, font="Arial").next_to(sq2, DOWN, buff=0.3)

        self.play(FadeIn(sq2), Write(area2), run_time=0.6)
        self.play(Write(side2), run_time=0.5)
        self.wait(0.3)

        # Reveal
        root2 = Text("side = 1.41421356...", font_size=24, color=ROSE, font="Arial").next_to(sq2, DOWN, buff=0.3)
        label2 = Text("Irrational!", font_size=22, color=ROSE, font="Arial").next_to(root2, DOWN, buff=0.15)
        self.play(Transform(side2, root2), run_time=0.6)
        self.play(Write(label2), run_time=0.4)

        insight = Text("Not every square root is a neat number!", font_size=30, color=CYAN, font="Arial")
        insight.move_to(DOWN * 2.8)
        self.play(Write(insight), run_time=0.8)
        self.wait(0.5)


class ScientificNotationHook(Scene):
    """Earth to Sun: 150,000,000 km compresses into 1.5 x 10^8."""
    def construct(self):
        self.camera.background_color = BG

        # Earth and Sun
        earth = Circle(radius=0.3, color=BLUE, fill_opacity=0.6).move_to(LEFT * 5)
        earth_label = Text("Earth", font_size=20, color=BLUE, font="Arial").next_to(earth, DOWN, buff=0.2)
        sun = Circle(radius=0.8, color=AMBER, fill_opacity=0.6).move_to(RIGHT * 5)
        sun_label = Text("Sun", font_size=20, color=AMBER, font="Arial").next_to(sun, DOWN, buff=0.2)

        dist_line = DashedLine(LEFT * 4.6, RIGHT * 4.1, color=TEXT_SECONDARY)
        self.play(FadeIn(earth), Write(earth_label), FadeIn(sun), Write(sun_label), Create(dist_line), run_time=0.8)

        # Big number
        big_num = Text("150,000,000 km", font_size=40, color=TEXT_PRIMARY, font="Arial").move_to(UP * 1)
        self.play(Write(big_num), run_time=0.8)
        self.wait(0.4)

        # Highlight zeros
        zeros_note = Text("Too many zeros!", font_size=28, color=ROSE, font="Arial").move_to(UP * 2)
        self.play(Write(zeros_note), run_time=0.5)
        self.wait(0.3)

        # Transform to scientific notation
        sci = Text("1.5 x 10^8 km", font_size=48, color=EMERALD, font="Arial").move_to(UP * 1)
        self.play(Transform(big_num, sci), FadeOut(zeros_note), run_time=1)

        insight = Text("Big numbers made simple!", font_size=32, color=CYAN, font="Arial").move_to(DOWN * 2.5)
        self.play(Write(insight), run_time=0.6)
        self.wait(0.5)


class SciNotationOpsHook(Scene):
    """Multiply (3x10^4) x (2x10^3) = 6x10^7."""
    def construct(self):
        self.camera.background_color = BG

        title = Text("Multiplying BIG numbers", font_size=36, color=CYAN, font="Arial").move_to(UP * 3)
        self.play(Write(title), run_time=0.6)

        # The problem
        num1 = Text("(3 x 10^4)", font_size=44, color=BLUE, font="Arial").move_to(UP * 1.5 + LEFT * 2.5)
        times = Text("x", font_size=44, color=TEXT_PRIMARY, font="Arial").move_to(UP * 1.5)
        num2 = Text("(2 x 10^3)", font_size=44, color=VIOLET, font="Arial").move_to(UP * 1.5 + RIGHT * 2.5)
        self.play(Write(num1), Write(times), Write(num2), run_time=0.7)
        self.wait(0.3)

        # Show expansion
        expanded1 = Text("30,000", font_size=28, color=BLUE, font="Arial").next_to(num1, DOWN, buff=0.3)
        expanded2 = Text("2,000", font_size=28, color=VIOLET, font="Arial").next_to(num2, DOWN, buff=0.3)
        self.play(Write(expanded1), Write(expanded2), run_time=0.5)

        # Step: multiply coefficients, add exponents
        step1 = Text("3 x 2 = 6", font_size=32, color=EMERALD, font="Arial").move_to(DOWN * 0.3)
        step2 = Text("10^4 x 10^3 = 10^7", font_size=32, color=AMBER, font="Arial").move_to(DOWN * 1.1)
        self.play(Write(step1), run_time=0.5)
        self.play(Write(step2), run_time=0.5)

        # Result
        result = Text("= 6 x 10^7", font_size=52, color=EMERALD, font="Arial").move_to(DOWN * 2.3)
        expanded_result = Text("= 60,000,000", font_size=28, color=TEXT_SECONDARY, font="Arial").move_to(DOWN * 3.1)
        box = SurroundingRectangle(result, color=EMERALD, buff=0.2)
        self.play(Write(result), Create(box), run_time=0.7)
        self.play(Write(expanded_result), run_time=0.4)
        self.wait(0.5)


class RealNumberSystemHook(Scene):
    """Nested circles: Natural C Whole C Integer C Rational C Real."""
    def construct(self):
        self.camera.background_color = BG

        radii = [0.7, 1.2, 1.8, 2.5, 3.2]
        colors_list = [AMBER, EMERALD, CYAN, VIOLET, BLUE]
        names = ["Natural", "Whole", "Integer", "Rational", "Real"]
        examples = ["1, 2, 3...", "0, 1, 2...", "...-2, -1, 0, 1...", "1/2, -3/4, 0.75", "sqrt(2), pi"]

        circles = VGroup()
        labels = VGroup()
        ex_labels = VGroup()

        for i in range(5):
            c = Circle(radius=radii[i], color=colors_list[i], fill_opacity=0.05, stroke_width=2)
            circles.add(c)
            lbl = Text(names[i], font_size=18, color=colors_list[i], font="Arial")
            lbl.move_to(UP * (radii[i] - 0.2))
            labels.add(lbl)

        # Animate from inside out
        for i in range(5):
            anims = [Create(circles[i]), Write(labels[i])]
            self.play(*anims, run_time=0.6)

        # Show examples on the right
        for i in range(5):
            ex = Text(f"{names[i]}: {examples[i]}", font_size=18, color=colors_list[i], font="Arial")
            ex.move_to(RIGHT * 4.5 + UP * 2 + DOWN * i * 0.6)
            ex_labels.add(ex)
            self.play(Write(ex), run_time=0.3)

        self.wait(0.5)


# ============================================================
# Number Theory (15–19)
# ============================================================

class GcfLcmHook(Scene):
    """Two metronomes: one ticks every 3, other every 4. Sync at 12 (LCM)."""
    def construct(self):
        self.camera.background_color = BG

        title = Text("When do they sync?", font_size=36, color=CYAN, font="Arial").move_to(UP * 3.2)
        self.play(Write(title), run_time=0.6)

        # Timeline
        tl = NumberLine(x_range=[0, 13, 1], length=11, color=TEXT_SECONDARY,
                        include_numbers=False).move_to(ORIGIN)
        tl_labels = add_number_labels(tl, 0, 13, 1, font_size=20, color=TEXT_PRIMARY)
        self.play(Create(tl), FadeIn(tl_labels), run_time=0.6)

        # Metronome A: every 3 beats
        a_label = Text("A: every 3 beats", font_size=22, color=BLUE, font="Arial").move_to(UP * 1.8 + LEFT * 3)
        b_label = Text("B: every 4 beats", font_size=22, color=ROSE, font="Arial").move_to(DOWN * 1.8 + LEFT * 3)
        self.play(Write(a_label), Write(b_label), run_time=0.5)

        # Tick marks for A
        for beat in [3, 6, 9, 12]:
            tick = Triangle(fill_color=BLUE, fill_opacity=0.8, color=BLUE).scale(0.15)
            tick.move_to(tl.n2p(beat) + UP * 0.5)
            self.play(FadeIn(tick, shift=DOWN * 0.2), run_time=0.25)

        # Tick marks for B
        for beat in [4, 8, 12]:
            tick = Triangle(fill_color=ROSE, fill_opacity=0.8, color=ROSE).scale(0.15)
            tick.rotate(PI)
            tick.move_to(tl.n2p(beat) + DOWN * 0.5)
            self.play(FadeIn(tick, shift=UP * 0.2), run_time=0.25)

        # Highlight beat 12
        highlight = Circle(radius=0.35, color=AMBER, stroke_width=3).move_to(tl.n2p(12))
        sync_label = Text("SYNC! Beat 12", font_size=28, color=AMBER, font="Arial").move_to(DOWN * 2.8)
        lcm_label = Text("LCM(3, 4) = 12", font_size=32, color=EMERALD, font="Arial").move_to(UP * 2.5)
        self.play(Create(highlight), Write(sync_label), Write(lcm_label), run_time=0.8)
        self.wait(0.5)


class ExponentsHook(Scene):
    """Penny doubling: Day 1 $0.01 ... Day 30 $5,368,709.12."""
    def construct(self):
        self.camera.background_color = BG

        title = Text("The Penny Doubling Problem", font_size=36, color=AMBER, font="Arial")
        title.move_to(UP * 3.2)
        self.play(Write(title), run_time=0.7)

        days = [1, 2, 5, 10, 15, 20, 25, 30]
        amounts = ["$0.01", "$0.02", "$0.16", "$5.12", "$163.84",
                    "$5,242.88", "$167,772.16", "$5,368,709.12"]
        colors_list = [TEXT_SECONDARY, TEXT_SECONDARY, TEXT_SECONDARY, CYAN,
                       CYAN, AMBER, AMBER, EMERALD]

        entries = VGroup()
        for i, (d, a, c) in enumerate(zip(days, amounts, colors_list)):
            row = i % 4
            col = i // 4
            day_text = Text(f"Day {d}:", font_size=24, color=TEXT_SECONDARY, font="Arial")
            amt_text = Text(a, font_size=24, color=c, font="Arial")
            day_text.move_to(LEFT * 3 + RIGHT * col * 6.5 + UP * 1.5 + DOWN * row * 0.8)
            amt_text.next_to(day_text, RIGHT, buff=0.3)
            entries.add(VGroup(day_text, amt_text))

        for entry in entries:
            self.play(Write(entry), run_time=0.35)

        # Reaction
        wow = Text("One penny becomes $5 MILLION?!", font_size=32, color=ROSE, font="Arial")
        wow.move_to(DOWN * 2)
        formula = Text("2^29 pennies = $5,368,709.12", font_size=28, color=EMERALD, font="Arial")
        formula.move_to(DOWN * 2.8)
        self.play(Write(wow), run_time=0.7)
        self.play(Write(formula), run_time=0.6)
        self.wait(0.5)


class ExponentRulesHook(Scene):
    """Tree branching: base 2 -> 2, 4, 8, 16 leaves at each level."""
    def construct(self):
        self.camera.background_color = BG

        title = Text("Exponential Growth: Branching", font_size=32, color=CYAN, font="Arial")
        title.move_to(UP * 3.4)
        self.play(Write(title), run_time=0.6)

        # Build a binary tree
        root = Dot(UP * 2.5, radius=0.1, color=AMBER)
        self.play(FadeIn(root), run_time=0.3)

        # Level 1: 2 nodes
        level_configs = [
            (2.5, 1.5, 2, 1.5, BLUE, "2^1 = 2"),
            (1.5, 0.5, 4, 0.75, VIOLET, "2^2 = 4"),
            (0.5, -0.5, 8, 0.375, EMERALD, "2^3 = 8"),
            (-0.5, -1.5, 16, 0.19, ROSE, "2^4 = 16"),
        ]

        prev_dots = [root]
        for y_from, y_to, count, spacing, color, label_text in level_configs:
            new_dots = []
            lines = VGroup()
            dots_group = VGroup()
            start_x = -(count - 1) * spacing / 2
            for i in range(count):
                d = Dot(np.array([start_x + i * spacing, y_to, 0]), radius=0.07, color=color)
                new_dots.append(d)
                dots_group.add(d)
                # Connect to parent
                parent_idx = i // 2
                if parent_idx < len(prev_dots):
                    line = Line(prev_dots[parent_idx].get_center(), d.get_center(),
                                color=color, stroke_width=1.5, stroke_opacity=0.6)
                    lines.add(line)

            label = Text(label_text, font_size=22, color=color, font="Arial")
            label.move_to(RIGHT * 5 + UP * (y_to + 0.2))

            self.play(Create(lines), FadeIn(dots_group, lag_ratio=0.05), Write(label), run_time=0.7)
            prev_dots = new_dots

        insight = Text("Each level DOUBLES!", font_size=30, color=AMBER, font="Arial").move_to(DOWN * 2.5)
        self.play(Write(insight), run_time=0.6)
        self.wait(0.5)


class OrderOfOpsHook(Scene):
    """Calculator: 2+3x4 — wrong (20) vs right (14)."""
    def construct(self):
        self.camera.background_color = BG

        problem = Text("2 + 3 x 4 = ?", font_size=52, color=TEXT_PRIMARY, font="Arial")
        problem.move_to(UP * 2.5)
        self.play(Write(problem), run_time=0.8)
        self.wait(0.3)

        # Wrong calculator
        wrong_box = RoundedRectangle(width=4, height=2.5, corner_radius=0.3, color=ROSE, fill_opacity=0.08).move_to(LEFT * 3 + DOWN * 0.5)
        wrong_title = Text("Calculator A", font_size=22, color=ROSE, font="Arial").move_to(wrong_box.get_top() + DOWN * 0.3)
        wrong_step = Text("(2+3) x 4", font_size=24, color=TEXT_SECONDARY, font="Arial").move_to(wrong_box.get_center() + UP * 0.1)
        wrong_ans = Text("= 20", font_size=40, color=ROSE, font="Arial").move_to(wrong_box.get_center() + DOWN * 0.6)
        wrong_x = Text("WRONG", font_size=20, color=ROSE, font="Arial").move_to(wrong_box.get_bottom() + UP * 0.2)

        # Right calculator
        right_box = RoundedRectangle(width=4, height=2.5, corner_radius=0.3, color=EMERALD, fill_opacity=0.08).move_to(RIGHT * 3 + DOWN * 0.5)
        right_title = Text("Calculator B", font_size=22, color=EMERALD, font="Arial").move_to(right_box.get_top() + DOWN * 0.3)
        right_step = Text("2 + (3x4)", font_size=24, color=TEXT_SECONDARY, font="Arial").move_to(right_box.get_center() + UP * 0.1)
        right_ans = Text("= 14", font_size=40, color=EMERALD, font="Arial").move_to(right_box.get_center() + DOWN * 0.6)
        right_check = Text("CORRECT", font_size=20, color=EMERALD, font="Arial").move_to(right_box.get_bottom() + UP * 0.2)

        self.play(FadeIn(wrong_box), Write(wrong_title), run_time=0.4)
        self.play(Write(wrong_step), Write(wrong_ans), Write(wrong_x), run_time=0.6)

        self.play(FadeIn(right_box), Write(right_title), run_time=0.4)
        self.play(Write(right_step), Write(right_ans), Write(right_check), run_time=0.6)

        insight = Text("Order matters! Multiply before adding.", font_size=28, color=AMBER, font="Arial")
        insight.move_to(DOWN * 2.8)
        self.play(Write(insight), run_time=0.7)
        self.wait(0.5)


class NumberPatternsHook(Scene):
    """Two sequences: arithmetic (2,4,6,8,?,?) and geometric (3,9,27,81,?,?)."""
    def construct(self):
        self.camera.background_color = BG

        title = Text("Can you spot the pattern?", font_size=36, color=CYAN, font="Arial")
        title.move_to(UP * 3)
        self.play(Write(title), run_time=0.6)

        # Arithmetic sequence
        arith_label = Text("Pattern A:", font_size=28, color=BLUE, font="Arial").move_to(LEFT * 5 + UP * 1.5)
        arith_nums = ["2", "4", "6", "8", "?", "?"]
        arith_colors = [BLUE, BLUE, BLUE, BLUE, AMBER, AMBER]
        arith_group = VGroup()
        for i, (n, c) in enumerate(zip(arith_nums, arith_colors)):
            t = Text(n, font_size=40, color=c, font="Arial")
            t.move_to(LEFT * 3.5 + RIGHT * i * 1.3 + UP * 1.5)
            arith_group.add(t)

        self.play(Write(arith_label), run_time=0.4)
        for t in arith_group[:4]:
            self.play(FadeIn(t, shift=UP * 0.2), run_time=0.25)
        self.play(FadeIn(arith_group[4]), FadeIn(arith_group[5]), run_time=0.4)

        # Rule
        arith_rule = Text("+2 each time", font_size=22, color=BLUE, font="Arial").move_to(RIGHT * 4.5 + UP * 1.5)
        self.play(Write(arith_rule), run_time=0.4)

        # Reveal
        ans1 = Text("10", font_size=40, color=EMERALD, font="Arial").move_to(arith_group[4])
        ans2 = Text("12", font_size=40, color=EMERALD, font="Arial").move_to(arith_group[5])
        self.play(Transform(arith_group[4], ans1), Transform(arith_group[5], ans2), run_time=0.5)

        # Geometric sequence
        geo_label = Text("Pattern B:", font_size=28, color=VIOLET, font="Arial").move_to(LEFT * 5 + DOWN * 0.5)
        geo_nums = ["3", "9", "27", "81", "?", "?"]
        geo_colors = [VIOLET, VIOLET, VIOLET, VIOLET, AMBER, AMBER]
        geo_group = VGroup()
        for i, (n, c) in enumerate(zip(geo_nums, geo_colors)):
            t = Text(n, font_size=40, color=c, font="Arial")
            t.move_to(LEFT * 3.5 + RIGHT * i * 1.3 + DOWN * 0.5)
            geo_group.add(t)

        self.play(Write(geo_label), run_time=0.4)
        for t in geo_group[:4]:
            self.play(FadeIn(t, shift=UP * 0.2), run_time=0.25)
        self.play(FadeIn(geo_group[4]), FadeIn(geo_group[5]), run_time=0.4)

        geo_rule = Text("x3 each time", font_size=22, color=VIOLET, font="Arial").move_to(RIGHT * 4.5 + DOWN * 0.5)
        self.play(Write(geo_rule), run_time=0.4)

        ans3 = Text("243", font_size=40, color=EMERALD, font="Arial").move_to(geo_group[4])
        ans4 = Text("729", font_size=40, color=EMERALD, font="Arial").move_to(geo_group[5])
        self.play(Transform(geo_group[4], ans3), Transform(geo_group[5], ans4), run_time=0.5)

        insight = Text("Adding vs Multiplying: very different growth!", font_size=28, color=AMBER, font="Arial")
        insight.move_to(DOWN * 2.5)
        self.play(Write(insight), run_time=0.7)
        self.wait(0.5)


# ============================================================
# Algebra (20–30)
# ============================================================

class VariablesHook(Scene):
    """Mystery box: input -> output. What's the rule? 2x+5!"""
    def construct(self):
        self.camera.background_color = BG

        title = Text("The Mystery Machine", font_size=36, color=CYAN, font="Arial").move_to(UP * 3.2)
        self.play(Write(title), run_time=0.6)

        # Machine box
        machine = RoundedRectangle(width=3, height=2, corner_radius=0.3, color=INDIGO, fill_opacity=0.15, stroke_width=2)
        machine.move_to(ORIGIN)
        q_mark = Text("?", font_size=72, color=INDIGO, font="Arial").move_to(machine)
        self.play(FadeIn(machine), Write(q_mark), run_time=0.6)

        # Input/output arrows
        in_arrow = Arrow(LEFT * 4, LEFT * 1.7, color=EMERALD, stroke_width=3)
        out_arrow = Arrow(RIGHT * 1.7, RIGHT * 4, color=AMBER, stroke_width=3)
        self.play(Create(in_arrow), Create(out_arrow), run_time=0.4)

        # Test 1: 3 -> 11
        inp1 = Text("3", font_size=44, color=EMERALD, font="Arial").move_to(LEFT * 4.8)
        out1 = Text("11", font_size=44, color=AMBER, font="Arial").move_to(RIGHT * 4.8)
        self.play(Write(inp1), run_time=0.3)
        self.play(Write(out1), run_time=0.3)
        self.wait(0.2)

        # Test 2: 5 -> 15
        pair1 = VGroup(inp1.copy(), out1.copy()).move_to(UP * 2 + RIGHT * 4)
        pair1.scale(0.5)
        log1 = Text("3 -> 11", font_size=22, color=TEXT_SECONDARY, font="Arial").move_to(UP * 2 + RIGHT * 4.5)
        self.play(FadeOut(inp1), FadeOut(out1), Write(log1), run_time=0.3)

        inp2 = Text("5", font_size=44, color=EMERALD, font="Arial").move_to(LEFT * 4.8)
        out2 = Text("15", font_size=44, color=AMBER, font="Arial").move_to(RIGHT * 4.8)
        self.play(Write(inp2), run_time=0.3)
        self.play(Write(out2), run_time=0.3)

        log2 = Text("5 -> 15", font_size=22, color=TEXT_SECONDARY, font="Arial").move_to(UP * 1.5 + RIGHT * 4.5)
        self.play(FadeOut(inp2), FadeOut(out2), Write(log2), run_time=0.3)

        # Test 3: 0 -> 5
        inp3 = Text("0", font_size=44, color=EMERALD, font="Arial").move_to(LEFT * 4.8)
        out3 = Text("5", font_size=44, color=AMBER, font="Arial").move_to(RIGHT * 4.8)
        self.play(Write(inp3), run_time=0.3)
        self.play(Write(out3), run_time=0.3)

        log3 = Text("0 -> 5", font_size=22, color=TEXT_SECONDARY, font="Arial").move_to(UP * 1 + RIGHT * 4.5)
        self.play(FadeOut(inp3), FadeOut(out3), Write(log3), run_time=0.3)

        # Reveal rule
        rule = Text("Rule: 2x + 5", font_size=48, color=EMERALD, font="Arial").move_to(machine)
        self.play(FadeOut(q_mark), Write(rule), run_time=0.8)

        insight = Text("Variables let us describe the pattern!", font_size=28, color=AMBER, font="Arial")
        insight.move_to(DOWN * 2.8)
        self.play(Write(insight), run_time=0.6)
        self.wait(0.5)


class OneStepEquationsHook(Scene):
    """Balance scale: x+5 on one side, 12 on other. Remove 5 -> x=7."""
    def construct(self):
        self.camera.background_color = BG

        # Balance beam
        fulcrum = Triangle(color=TEXT_SECONDARY, fill_opacity=0.3).scale(0.4).move_to(DOWN * 1.5)
        beam = Line(LEFT * 4, RIGHT * 4, color=TEXT_SECONDARY, stroke_width=4).move_to(DOWN * 0.9)
        self.play(FadeIn(fulcrum), Create(beam), run_time=0.5)

        # Left side: x + 5
        left_box = RoundedRectangle(width=1.2, height=0.8, corner_radius=0.15, color=INDIGO, fill_opacity=0.3)
        left_box.move_to(LEFT * 3 + UP * 0)
        x_label = Text("x", font_size=32, color=INDIGO, font="Arial").move_to(left_box)

        plus = Text("+", font_size=28, color=TEXT_PRIMARY, font="Arial").move_to(LEFT * 1.8 + UP * 0)

        five_box = RoundedRectangle(width=1.2, height=0.8, corner_radius=0.15, color=AMBER, fill_opacity=0.3)
        five_box.move_to(LEFT * 1 + UP * 0)
        five_label = Text("5", font_size=32, color=AMBER, font="Arial").move_to(five_box)

        # Right side: 12
        twelve_box = RoundedRectangle(width=1.5, height=0.8, corner_radius=0.15, color=EMERALD, fill_opacity=0.3)
        twelve_box.move_to(RIGHT * 2.5 + UP * 0)
        twelve_label = Text("12", font_size=32, color=EMERALD, font="Arial").move_to(twelve_box)

        eq_sign = Text("=", font_size=36, color=TEXT_PRIMARY, font="Arial").move_to(UP * 0)

        self.play(
            FadeIn(left_box), Write(x_label), Write(plus),
            FadeIn(five_box), Write(five_label),
            Write(eq_sign),
            FadeIn(twelve_box), Write(twelve_label),
            run_time=0.8
        )
        self.wait(0.4)

        # Step: subtract 5 from both sides
        sub_text = Text("-5 from both sides", font_size=28, color=ROSE, font="Arial").move_to(UP * 2.5)
        self.play(Write(sub_text), run_time=0.5)

        # Remove five, change 12 to 7
        seven_label = Text("7", font_size=32, color=EMERALD, font="Arial").move_to(twelve_box)
        self.play(
            FadeOut(five_box), FadeOut(five_label), FadeOut(plus),
            Transform(twelve_label, seven_label),
            run_time=0.8
        )

        # Result
        result = Text("x = 7", font_size=52, color=CYAN, font="Arial").move_to(DOWN * 2.5)
        box = SurroundingRectangle(result, color=CYAN, buff=0.2)
        self.play(Write(result), Create(box), run_time=0.7)
        self.wait(0.5)


class TwoStepEquationsHook(Scene):
    """Two locks on treasure chest: first undo x3, then undo +2."""
    def construct(self):
        self.camera.background_color = BG

        # Treasure chest
        chest = RoundedRectangle(width=4, height=2.5, corner_radius=0.3, color=AMBER, fill_opacity=0.1, stroke_width=2)
        chest.move_to(RIGHT * 2.5 + UP * 0.5)
        chest_label = Text("x = ?", font_size=36, color=AMBER, font="Arial").move_to(chest)

        # Two locks
        lock1 = RoundedRectangle(width=1.8, height=1.2, corner_radius=0.2, color=ROSE, fill_opacity=0.2, stroke_width=2)
        lock1.move_to(LEFT * 4 + UP * 1)
        lock1_text = Text("x3", font_size=28, color=ROSE, font="Arial").move_to(lock1)

        lock2 = RoundedRectangle(width=1.8, height=1.2, corner_radius=0.2, color=VIOLET, fill_opacity=0.2, stroke_width=2)
        lock2.move_to(LEFT * 4 + DOWN * 1)
        lock2_text = Text("+2", font_size=28, color=VIOLET, font="Arial").move_to(lock2)

        equation = Text("3x + 2 = 17", font_size=40, color=TEXT_PRIMARY, font="Arial").move_to(UP * 3)
        self.play(Write(equation), run_time=0.6)
        self.play(FadeIn(chest), Write(chest_label), run_time=0.5)
        self.play(FadeIn(lock1), Write(lock1_text), FadeIn(lock2), Write(lock2_text), run_time=0.5)
        self.wait(0.3)

        # Step 1: Undo +2
        step1 = Text("Step 1: Undo +2  (subtract 2)", font_size=26, color=VIOLET, font="Arial").move_to(DOWN * 2)
        self.play(Write(step1), run_time=0.5)
        self.play(FadeOut(lock2), FadeOut(lock2_text), run_time=0.4)

        eq2 = Text("3x = 15", font_size=36, color=TEXT_PRIMARY, font="Arial").next_to(step1, DOWN, buff=0.3)
        self.play(Write(eq2), run_time=0.4)

        # Step 2: Undo x3
        step2 = Text("Step 2: Undo x3  (divide by 3)", font_size=26, color=ROSE, font="Arial").move_to(DOWN * 3.3)
        self.play(Write(step2), run_time=0.5)
        self.play(FadeOut(lock1), FadeOut(lock1_text), run_time=0.4)

        # Reveal answer
        answer = Text("x = 5", font_size=48, color=EMERALD, font="Arial").move_to(chest)
        self.play(Transform(chest_label, answer), run_time=0.7)
        self.wait(0.5)


class MultiStepEquationsHook(Scene):
    """Equation morphing: 3(x+2) -> 3x+6 -> solve."""
    def construct(self):
        self.camera.background_color = BG

        # Original equation
        eq1 = Text("3(x + 2) = 15", font_size=48, color=TEXT_PRIMARY, font="Arial").move_to(UP * 2)
        self.play(Write(eq1), run_time=0.8)
        self.wait(0.3)

        # Distribute
        dist_label = Text("Distribute the 3:", font_size=26, color=CYAN, font="Arial").move_to(UP * 0.8)
        eq2 = Text("3x + 6 = 15", font_size=48, color=BLUE, font="Arial").move_to(ORIGIN)
        self.play(Write(dist_label), run_time=0.4)
        self.play(Write(eq2), run_time=0.6)
        self.wait(0.2)

        # Subtract 6
        step2_label = Text("Subtract 6:", font_size=26, color=VIOLET, font="Arial").move_to(DOWN * 0.8)
        eq3 = Text("3x = 9", font_size=48, color=VIOLET, font="Arial").move_to(DOWN * 1.6)
        self.play(Write(step2_label), run_time=0.4)
        self.play(Write(eq3), run_time=0.5)

        # Divide by 3
        step3_label = Text("Divide by 3:", font_size=26, color=EMERALD, font="Arial").move_to(DOWN * 2.4)
        eq4 = Text("x = 3", font_size=52, color=EMERALD, font="Arial").move_to(DOWN * 3.2)
        box = SurroundingRectangle(eq4, color=EMERALD, buff=0.2)
        self.play(Write(step3_label), run_time=0.4)
        self.play(Write(eq4), Create(box), run_time=0.6)
        self.wait(0.5)


class InequalitiesHook(Scene):
    """Number line with shaded region: x > 3 lights up everything right of 3."""
    def construct(self):
        self.camera.background_color = BG

        title = Text("x > 3", font_size=56, color=TEXT_PRIMARY, font="Arial").move_to(UP * 2.5)
        self.play(Write(title), run_time=0.6)

        # Number line
        nl = NumberLine(x_range=[-2, 8, 1], length=10, color=TEXT_SECONDARY,
                        include_numbers=False).move_to(ORIGIN)
        nl_labels = add_number_labels(nl, -2, 8, 1, font_size=24, color=TEXT_PRIMARY)
        self.play(Create(nl), FadeIn(nl_labels), run_time=0.7)

        # Open circle at 3 (not included)
        open_circle = Circle(radius=0.15, color=EMERALD, stroke_width=3).move_to(nl.n2p(3))
        self.play(Create(open_circle), run_time=0.3)

        # Shade right of 3
        shade = Line(nl.n2p(3.2), nl.n2p(8), color=EMERALD, stroke_width=8, stroke_opacity=0.6)
        arrow_tip = Triangle(color=EMERALD, fill_opacity=0.8).scale(0.15).move_to(nl.n2p(8))
        self.play(Create(shade), FadeIn(arrow_tip), run_time=0.8)

        # Show test points
        yes_4 = Text("4? YES", font_size=24, color=EMERALD, font="Arial").move_to(nl.n2p(4) + UP * 1)
        yes_7 = Text("7? YES", font_size=24, color=EMERALD, font="Arial").move_to(nl.n2p(7) + UP * 1)
        no_2 = Text("2? NO", font_size=24, color=ROSE, font="Arial").move_to(nl.n2p(2) + UP * 1)
        no_3 = Text("3? NO", font_size=24, color=ROSE, font="Arial").move_to(nl.n2p(3) + DOWN * 1)

        self.play(Write(yes_4), Write(yes_7), run_time=0.5)
        self.play(Write(no_2), Write(no_3), run_time=0.5)

        insight = Text("Infinite solutions on a ray!", font_size=30, color=AMBER, font="Arial")
        insight.move_to(DOWN * 2.5)
        self.play(Write(insight), run_time=0.6)
        self.wait(0.5)


class CoordinatePlaneHook(Scene):
    """Dots appearing at coordinates with animated grid."""
    def construct(self):
        self.camera.background_color = BG

        # Grid
        axes = Axes(
            x_range=[-5, 6, 1], y_range=[-4, 5, 1],
            x_length=10, y_length=8,
            axis_config={"color": TEXT_SECONDARY, "include_numbers": False},
        )
        axes_labels = add_axes_labels(axes, [-5, 6, 1], [-4, 5, 1], font_size=18, color=TEXT_PRIMARY)
        self.play(Create(axes), FadeIn(axes_labels), run_time=0.8)

        # Points with labels
        points = [(2, 3, BLUE), (5, 1, EMERALD), (-3, 4, VIOLET), (-2, -2, ROSE), (4, -1, AMBER)]
        for x, y, color in points:
            dot = Dot(axes.c2p(x, y), radius=0.12, color=color)
            label = Text(f"({x}, {y})", font_size=20, color=color, font="Arial")
            label.next_to(dot, UR, buff=0.15)

            # Animated guidelines
            h_line = DashedLine(axes.c2p(0, y), axes.c2p(x, y), color=color, stroke_opacity=0.3)
            v_line = DashedLine(axes.c2p(x, 0), axes.c2p(x, y), color=color, stroke_opacity=0.3)
            self.play(Create(h_line), Create(v_line), run_time=0.3)
            self.play(FadeIn(dot, scale=2), Write(label), run_time=0.4)

        insight = Text("Every point has an address!", font_size=30, color=CYAN, font="Arial")
        insight.move_to(DOWN * 3.5)
        self.play(Write(insight), run_time=0.6)
        self.wait(0.5)


class FunctionsHook(Scene):
    """Machine: input -> [x2] -> [+1] -> output. f(x)=2x+1."""
    def construct(self):
        self.camera.background_color = BG

        # Function machine pipeline
        box1 = RoundedRectangle(width=2, height=1.2, corner_radius=0.2, color=BLUE, fill_opacity=0.15, stroke_width=2)
        box1.move_to(LEFT * 1.5)
        box1_label = Text("x 2", font_size=28, color=BLUE, font="Arial").move_to(box1)

        box2 = RoundedRectangle(width=2, height=1.2, corner_radius=0.2, color=VIOLET, fill_opacity=0.15, stroke_width=2)
        box2.move_to(RIGHT * 1.5)
        box2_label = Text("+ 1", font_size=28, color=VIOLET, font="Arial").move_to(box2)

        arrow_in = Arrow(LEFT * 4, LEFT * 2.7, color=EMERALD, stroke_width=3)
        arrow_mid = Arrow(LEFT * 0.3, RIGHT * 0.3, color=TEXT_SECONDARY, stroke_width=3)
        arrow_out = Arrow(RIGHT * 2.7, RIGHT * 4, color=AMBER, stroke_width=3)

        self.play(
            FadeIn(box1), Write(box1_label),
            FadeIn(box2), Write(box2_label),
            Create(arrow_in), Create(arrow_mid), Create(arrow_out),
            run_time=0.8
        )

        # Test inputs
        tests = [(3, 6, 7), (5, 10, 11), (0, 0, 1)]
        for inp, mid, out in tests:
            in_text = Text(str(inp), font_size=36, color=EMERALD, font="Arial").move_to(LEFT * 4.7)
            mid_text = Text(str(mid), font_size=28, color=TEXT_SECONDARY, font="Arial").move_to(UP * 1 + ORIGIN)
            out_text = Text(str(out), font_size=36, color=AMBER, font="Arial").move_to(RIGHT * 4.7)

            self.play(Write(in_text), run_time=0.2)
            self.play(Write(mid_text), run_time=0.2)
            self.play(Write(out_text), run_time=0.2)
            self.play(FadeOut(in_text), FadeOut(mid_text), FadeOut(out_text), run_time=0.2)

        # Reveal function notation
        func = Text("f(x) = 2x + 1", font_size=48, color=CYAN, font="Arial").move_to(DOWN * 2.5)
        box = SurroundingRectangle(func, color=CYAN, buff=0.2)
        self.play(Write(func), Create(box), run_time=0.8)
        self.wait(0.5)


class LinearEquationsHook(Scene):
    """Line drawing itself point by point: y = 2x + 1."""
    def construct(self):
        self.camera.background_color = BG

        equation = Text("y = 2x + 1", font_size=40, color=CYAN, font="Arial").move_to(UP * 3.2)
        self.play(Write(equation), run_time=0.6)

        axes = Axes(
            x_range=[-3, 4, 1], y_range=[-3, 8, 1],
            x_length=7, y_length=6,
            axis_config={"color": TEXT_SECONDARY, "include_numbers": False},
        ).move_to(DOWN * 0.3)
        axes_labels = add_axes_labels(axes, [-3, 4, 1], [-3, 8, 1], font_size=16, color=TEXT_PRIMARY)
        self.play(Create(axes), FadeIn(axes_labels), run_time=0.6)

        # Plot points one by one
        points_data = [(-1, -1), (0, 1), (1, 3), (2, 5), (3, 7)]
        dots = VGroup()
        for x, y in points_data:
            dot = Dot(axes.c2p(x, y), radius=0.1, color=AMBER)
            label = Text(f"({x},{y})", font_size=16, color=TEXT_SECONDARY, font="Arial")
            label.next_to(dot, UR, buff=0.1)
            dots.add(dot)
            self.play(FadeIn(dot, scale=2), Write(label), run_time=0.35)

        # Draw line through them
        line = axes.plot(lambda x: 2 * x + 1, x_range=[-1.5, 3.5], color=EMERALD, stroke_width=3)
        self.play(Create(line), run_time=1)

        insight = Text("Points that follow a rule make a LINE!", font_size=26, color=EMERALD, font="Arial")
        insight.move_to(DOWN * 3.5)
        self.play(Write(insight), run_time=0.6)
        self.wait(0.5)


class SlopeHook(Scene):
    """Three hills: gentle (small m), steep (big m), downhill (negative m)."""
    def construct(self):
        self.camera.background_color = BG

        title = Text("Slope = steepness", font_size=36, color=CYAN, font="Arial").move_to(UP * 3.2)
        self.play(Write(title), run_time=0.6)

        # Three slope diagrams
        configs = [
            (LEFT * 4, 0.5, "m = 0.5", "Gentle", BLUE),
            (ORIGIN, 2, "m = 2", "Steep", EMERALD),
            (RIGHT * 4, -1, "m = -1", "Downhill", ROSE),
        ]

        for center, slope, m_text, desc, color in configs:
            # Draw a simple slope line
            start = center + LEFT * 1.2 + DOWN * abs(slope) * 0.8
            end = center + RIGHT * 1.2 + UP * slope * 0.8 if slope > 0 else center + RIGHT * 1.2 + UP * slope * 0.8
            line = Line(start, end, color=color, stroke_width=4)
            ground = DashedLine(center + LEFT * 1.5 + DOWN * 1.2, center + RIGHT * 1.5 + DOWN * 1.2,
                                color=TEXT_SECONDARY, stroke_width=1)

            m_label = Text(m_text, font_size=24, color=color, font="Arial").move_to(center + UP * 2)
            desc_label = Text(desc, font_size=22, color=TEXT_SECONDARY, font="Arial").move_to(center + DOWN * 2)

            self.play(Create(ground), Create(line), Write(m_label), Write(desc_label), run_time=0.7)

        self.wait(0.5)


class SlopeInterceptHook(Scene):
    """Line with highlighted y-intercept (b) and slope step (rise/run)."""
    def construct(self):
        self.camera.background_color = BG

        equation = Text("y = mx + b", font_size=44, color=TEXT_PRIMARY, font="Arial").move_to(UP * 3.2)
        self.play(Write(equation), run_time=0.6)

        axes = Axes(
            x_range=[-2, 6, 1], y_range=[-1, 7, 1],
            x_length=8, y_length=6,
            axis_config={"color": TEXT_SECONDARY, "include_numbers": False},
        ).move_to(DOWN * 0.3 + LEFT * 0.5)
        axes_labels = add_axes_labels(axes, [-2, 6, 1], [-1, 7, 1], font_size=16, color=TEXT_PRIMARY)
        self.play(Create(axes), FadeIn(axes_labels), run_time=0.5)

        # Line: y = (2/3)x + 2  (slope=2/3, intercept=2)
        line = axes.plot(lambda x: (2/3) * x + 2, x_range=[-1, 5.5], color=EMERALD, stroke_width=3)
        self.play(Create(line), run_time=0.7)

        # Highlight y-intercept
        b_dot = Dot(axes.c2p(0, 2), radius=0.15, color=AMBER)
        b_label = Text("b = 2", font_size=28, color=AMBER, font="Arial").next_to(b_dot, LEFT, buff=0.3)
        b_note = Text("(y-intercept)", font_size=18, color=AMBER, font="Arial").next_to(b_label, DOWN, buff=0.1)
        self.play(FadeIn(b_dot, scale=2), Write(b_label), Write(b_note), run_time=0.6)

        # Show rise/run triangle
        p1 = axes.c2p(1, 2 + 2/3)
        p2 = axes.c2p(4, 2 + 2/3)
        p3 = axes.c2p(4, 2 + 8/3)
        run_line = Line(p1, p2, color=CYAN, stroke_width=3)
        rise_line = Line(p2, p3, color=ROSE, stroke_width=3)
        run_label = Text("run = 3", font_size=20, color=CYAN, font="Arial").next_to(run_line, DOWN, buff=0.15)
        rise_label = Text("rise = 2", font_size=20, color=ROSE, font="Arial").next_to(rise_line, RIGHT, buff=0.15)

        self.play(Create(run_line), Write(run_label), run_time=0.5)
        self.play(Create(rise_line), Write(rise_label), run_time=0.5)

        slope_text = Text("slope m = rise/run = 2/3", font_size=26, color=VIOLET, font="Arial")
        slope_text.move_to(DOWN * 3.3)
        self.play(Write(slope_text), run_time=0.6)
        self.wait(0.5)


class SystemsOfEquationsHook(Scene):
    """Two lines approaching and crossing at a point."""
    def construct(self):
        self.camera.background_color = BG

        title = Text("Where do they meet?", font_size=36, color=CYAN, font="Arial").move_to(UP * 3.2)
        self.play(Write(title), run_time=0.6)

        axes = Axes(
            x_range=[-2, 6, 1], y_range=[-2, 6, 1],
            x_length=8, y_length=7,
            axis_config={"color": TEXT_SECONDARY, "include_numbers": False},
        ).move_to(DOWN * 0.2)
        axes_labels = add_axes_labels(axes, [-2, 6, 1], [-2, 6, 1], font_size=16, color=TEXT_PRIMARY)
        self.play(Create(axes), FadeIn(axes_labels), run_time=0.5)

        # Line 1: y = x + 1
        line1 = axes.plot(lambda x: x + 1, x_range=[-1.5, 4.5], color=BLUE, stroke_width=3)
        eq1 = Text("y = x + 1", font_size=24, color=BLUE, font="Arial").move_to(RIGHT * 4 + UP * 2)
        self.play(Create(line1), Write(eq1), run_time=0.7)

        # Line 2: y = -x + 5
        line2 = axes.plot(lambda x: -x + 5, x_range=[-0.5, 5.5], color=ROSE, stroke_width=3)
        eq2 = Text("y = -x + 5", font_size=24, color=ROSE, font="Arial").move_to(RIGHT * 4 + UP * 1.3)
        self.play(Create(line2), Write(eq2), run_time=0.7)
        self.wait(0.3)

        # Highlight intersection
        inter_dot = Dot(axes.c2p(2, 3), radius=0.15, color=AMBER)
        inter_label = Text("(2, 3)", font_size=28, color=AMBER, font="Arial").next_to(inter_dot, UL, buff=0.2)
        highlight = Circle(radius=0.35, color=AMBER, stroke_width=3).move_to(axes.c2p(2, 3))

        self.play(Create(highlight), FadeIn(inter_dot, scale=2), Write(inter_label), run_time=0.8)

        insight = Text("The solution satisfies BOTH equations!", font_size=26, color=EMERALD, font="Arial")
        insight.move_to(DOWN * 3.5)
        self.play(Write(insight), run_time=0.6)
        self.wait(0.5)


# ============================================================
# Geometry (31–36)
# ============================================================

class TrianglesHook(Scene):
    """Three triangles morphing: scalene -> isosceles -> equilateral."""
    def construct(self):
        self.camera.background_color = BG

        title = Text("Triangle Types", font_size=36, color=CYAN, font="Arial").move_to(UP * 3.2)
        self.play(Write(title), run_time=0.5)

        # Scalene
        scalene = Polygon(
            LEFT * 2 + DOWN, RIGHT * 1.5 + DOWN, UP * 1 + RIGHT * 0.3,
            color=BLUE, fill_opacity=0.15, stroke_width=2
        ).move_to(ORIGIN)
        scalene_label = Text("Scalene", font_size=28, color=BLUE, font="Arial").move_to(DOWN * 2)
        scalene_desc = Text("All sides different", font_size=20, color=TEXT_SECONDARY, font="Arial").move_to(DOWN * 2.6)
        self.play(Create(scalene), Write(scalene_label), Write(scalene_desc), run_time=0.7)
        self.wait(0.4)

        # Morph to isosceles
        isosceles = Polygon(
            LEFT * 1.5 + DOWN, RIGHT * 1.5 + DOWN, UP * 1.5,
            color=VIOLET, fill_opacity=0.15, stroke_width=2
        ).move_to(ORIGIN)
        iso_label = Text("Isosceles", font_size=28, color=VIOLET, font="Arial").move_to(DOWN * 2)
        iso_desc = Text("Two sides equal", font_size=20, color=TEXT_SECONDARY, font="Arial").move_to(DOWN * 2.6)
        self.play(
            Transform(scalene, isosceles),
            Transform(scalene_label, iso_label),
            Transform(scalene_desc, iso_desc),
            run_time=0.8
        )
        self.wait(0.4)

        # Morph to equilateral
        s = 1.8
        equilateral = Polygon(
            LEFT * s / 2 + DOWN * (s * np.sqrt(3) / 4),
            RIGHT * s / 2 + DOWN * (s * np.sqrt(3) / 4),
            UP * (s * np.sqrt(3) / 4),
            color=EMERALD, fill_opacity=0.15, stroke_width=2
        ).move_to(ORIGIN)
        eq_label = Text("Equilateral", font_size=28, color=EMERALD, font="Arial").move_to(DOWN * 2)
        eq_desc = Text("All sides equal", font_size=20, color=TEXT_SECONDARY, font="Arial").move_to(DOWN * 2.6)
        self.play(
            Transform(scalene, equilateral),
            Transform(scalene_label, eq_label),
            Transform(scalene_desc, eq_desc),
            run_time=0.8
        )
        self.wait(0.5)


class QuadrilateralsHook(Scene):
    """Shape morphing: square -> rectangle -> parallelogram -> trapezoid -> rhombus."""
    def construct(self):
        self.camera.background_color = BG

        title = Text("Quadrilateral Family", font_size=36, color=CYAN, font="Arial").move_to(UP * 3.2)
        self.play(Write(title), run_time=0.5)

        shapes = [
            (Square(side_length=2.5), "Square", BLUE),
            (Rectangle(width=3.5, height=1.8), "Rectangle", VIOLET),
            (Polygon(LEFT * 1.5 + DOWN * 0.9, RIGHT * 1.5 + DOWN * 0.9,
                      RIGHT * 2 + UP * 0.9, LEFT * 1 + UP * 0.9), "Parallelogram", EMERALD),
            (Polygon(LEFT * 1 + UP * 0.9, RIGHT * 1.5 + UP * 0.9,
                      RIGHT * 2 + DOWN * 0.9, LEFT * 2 + DOWN * 0.9), "Trapezoid", AMBER),
            (Polygon(ORIGIN + UP * 1.3, RIGHT * 1.5, ORIGIN + DOWN * 1.3, LEFT * 1.5), "Rhombus", ROSE),
        ]

        current_shape = shapes[0][0].copy()
        current_shape.set_color(shapes[0][2]).set_fill(shapes[0][2], opacity=0.15).set_stroke(width=2)
        current_shape.move_to(ORIGIN)
        label = Text(shapes[0][1], font_size=32, color=shapes[0][2], font="Arial").move_to(DOWN * 2.5)
        self.play(Create(current_shape), Write(label), run_time=0.6)
        self.wait(0.3)

        for shape, name, color in shapes[1:]:
            new_shape = shape.copy()
            new_shape.set_color(color).set_fill(color, opacity=0.15).set_stroke(width=2)
            new_shape.move_to(ORIGIN)
            new_label = Text(name, font_size=32, color=color, font="Arial").move_to(DOWN * 2.5)
            self.play(
                Transform(current_shape, new_shape),
                Transform(label, new_label),
                run_time=0.8
            )
            self.wait(0.3)

        self.wait(0.3)


class CirclesHook(Scene):
    """Circle with radius sweeping, then circumference unrolling = pi*d."""
    def construct(self):
        self.camera.background_color = BG

        # Draw circle
        circle = Circle(radius=1.8, color=BLUE, stroke_width=3).move_to(LEFT * 2 + UP * 0.5)
        center = Dot(LEFT * 2 + UP * 0.5, radius=0.06, color=AMBER)
        self.play(Create(circle), FadeIn(center), run_time=0.7)

        # Radius sweep
        radius_line = Line(LEFT * 2 + UP * 0.5, LEFT * 2 + UP * 0.5 + RIGHT * 1.8, color=AMBER, stroke_width=3)
        r_label = Text("r", font_size=28, color=AMBER, font="Arial").next_to(radius_line, DOWN, buff=0.15)
        self.play(Create(radius_line), Write(r_label), run_time=0.5)

        # Sweep the radius around
        self.play(Rotate(radius_line, angle=2 * PI, about_point=LEFT * 2 + UP * 0.5), run_time=1.5)

        # Diameter
        d_line = Line(LEFT * 2 + UP * 0.5 + LEFT * 1.8, LEFT * 2 + UP * 0.5 + RIGHT * 1.8,
                       color=CYAN, stroke_width=3)
        d_label = Text("d", font_size=28, color=CYAN, font="Arial").next_to(d_line, DOWN, buff=0.15)
        self.play(Create(d_line), Write(d_label), run_time=0.5)

        # Unroll circumference
        unrolled = Line(RIGHT * 0.5 + DOWN * 2, RIGHT * 0.5 + DOWN * 2 + RIGHT * (2 * PI * 1.8 / 2),
                        color=EMERALD, stroke_width=4)
        # Scale to fit: actual circumference is ~11.3, scale to ~5.5 for screen
        unrolled = Line(RIGHT * 0.5 + DOWN * 2, RIGHT * 6 + DOWN * 2, color=EMERALD, stroke_width=4)
        c_label = Text("C = pi x d", font_size=32, color=EMERALD, font="Arial").move_to(RIGHT * 3.2 + DOWN * 1.2)

        self.play(Create(unrolled), run_time=0.8)
        self.play(Write(c_label), run_time=0.6)

        formula = Text("Circumference = pi x diameter", font_size=28, color=AMBER, font="Arial")
        formula.move_to(DOWN * 3)
        self.play(Write(formula), run_time=0.7)
        self.wait(0.5)


class AreaPerimeterHook(Scene):
    """Rectangle: filling inside (area) vs walking around (perimeter)."""
    def construct(self):
        self.camera.background_color = BG

        title = Text("Area vs Perimeter", font_size=36, color=CYAN, font="Arial").move_to(UP * 3.2)
        self.play(Write(title), run_time=0.5)

        # --- Area side ---
        rect_a = Rectangle(width=3, height=2, color=BLUE, stroke_width=2).move_to(LEFT * 3)
        area_title = Text("Area", font_size=28, color=BLUE, font="Arial").move_to(LEFT * 3 + UP * 1.8)
        self.play(Create(rect_a), Write(area_title), run_time=0.5)

        # Fill inside
        fill = Rectangle(width=3, height=2, color=BLUE, fill_opacity=0.4, stroke_width=0).move_to(rect_a)
        fill_label = Text("Inside!", font_size=22, color=BLUE, font="Arial").move_to(rect_a)
        self.play(FadeIn(fill), Write(fill_label), run_time=0.6)

        area_formula = Text("= 3 x 2 = 6 sq units", font_size=22, color=BLUE, font="Arial")
        area_formula.move_to(LEFT * 3 + DOWN * 1.8)
        self.play(Write(area_formula), run_time=0.5)

        # --- Perimeter side ---
        rect_p = Rectangle(width=3, height=2, color=EMERALD, stroke_width=2).move_to(RIGHT * 3)
        perim_title = Text("Perimeter", font_size=28, color=EMERALD, font="Arial").move_to(RIGHT * 3 + UP * 1.8)
        self.play(Create(rect_p), Write(perim_title), run_time=0.5)

        # Trace around with thick highlighted border
        border = Rectangle(width=3, height=2, color=EMERALD, stroke_width=6, stroke_opacity=0.7).move_to(rect_p)
        walk_label = Text("Around!", font_size=22, color=EMERALD, font="Arial").move_to(rect_p)
        self.play(Create(border, run_time=1.2), Write(walk_label))

        perim_formula = Text("= 2(3+2) = 10 units", font_size=22, color=EMERALD, font="Arial")
        perim_formula.move_to(RIGHT * 3 + DOWN * 1.8)
        self.play(Write(perim_formula), run_time=0.5)

        insight = Text("Area fills, Perimeter traces!", font_size=28, color=AMBER, font="Arial")
        insight.move_to(DOWN * 3)
        self.play(Write(insight), run_time=0.6)
        self.wait(0.5)


class VolumeHook(Scene):
    """Cube stacking: 3x3 base, 3 layers high = 27 cubes."""
    def construct(self):
        self.camera.background_color = BG

        title = Text("Volume = counting cubes", font_size=36, color=CYAN, font="Arial").move_to(UP * 3.2)
        self.play(Write(title), run_time=0.5)

        # Isometric-ish representation using squares with offset
        cube_size = 0.55
        x_step = RIGHT * cube_size
        y_step = UP * cube_size
        z_step = (RIGHT * 0.3 + UP * 0.3) * cube_size  # depth offset

        layers = VGroup()
        layer_labels = []

        for layer in range(3):
            layer_group = VGroup()
            for row in range(3):
                for col in range(3):
                    pos = (LEFT * 2.5 + DOWN * 1
                           + x_step * col
                           + y_step * layer * 1
                           + RIGHT * 0.05 * layer  # slight offset for 3D feel
                           + DOWN * row * cube_size * 0.3 + RIGHT * row * cube_size * 0.3)
                    colors_list = [BLUE, VIOLET, EMERALD]
                    sq = Square(side_length=cube_size * 0.9, color=colors_list[layer],
                                fill_opacity=0.3, stroke_width=1.5)
                    sq.move_to(pos)
                    layer_group.add(sq)
            layers.add(layer_group)

        # Animate layer by layer
        for i, layer_group in enumerate(layers):
            label = Text(f"Layer {i+1}: 9 cubes", font_size=22,
                         color=[BLUE, VIOLET, EMERALD][i], font="Arial")
            label.move_to(RIGHT * 3 + UP * 1 + DOWN * i * 0.7)
            self.play(FadeIn(layer_group, lag_ratio=0.05), Write(label), run_time=0.7)

        # Total
        total = Text("3 x 3 x 3 = 27 cubes", font_size=36, color=AMBER, font="Arial")
        total.move_to(DOWN * 2.5)
        formula = Text("Volume = length x width x height", font_size=24, color=TEXT_SECONDARY, font="Arial")
        formula.move_to(DOWN * 3.2)
        self.play(Write(total), run_time=0.6)
        self.play(Write(formula), run_time=0.5)
        self.wait(0.5)


class ProbabilityHook(Scene):
    """Dice rolling, landing on faces. How likely is a 6? -> 1/6."""
    def construct(self):
        self.camera.background_color = BG

        title = Text("How likely is a 6?", font_size=40, color=CYAN, font="Arial").move_to(UP * 3)
        self.play(Write(title), run_time=0.6)

        # Show all 6 faces
        faces = VGroup()
        face_colors = [TEXT_SECONDARY] * 5 + [AMBER]
        for i in range(6):
            face_box = RoundedRectangle(width=1.2, height=1.2, corner_radius=0.15,
                                         color=face_colors[i], fill_opacity=0.1, stroke_width=2)
            face_num = Text(str(i + 1), font_size=36, color=face_colors[i], font="Arial")
            face_num.move_to(face_box)
            face = VGroup(face_box, face_num)
            face.move_to(LEFT * 3.5 + RIGHT * i * 1.4 + UP * 1)
            faces.add(face)

        self.play(FadeIn(faces, lag_ratio=0.1), run_time=0.8)
        self.wait(0.3)

        # Highlight the 6
        highlight = SurroundingRectangle(faces[5], color=AMBER, buff=0.1, stroke_width=3)
        self.play(Create(highlight), run_time=0.4)

        # Probability
        frac = Text("1 out of 6 faces", font_size=30, color=TEXT_PRIMARY, font="Arial").move_to(DOWN * 0.5)
        self.play(Write(frac), run_time=0.5)

        prob = Text("P(6) = 1/6", font_size=48, color=AMBER, font="Arial").move_to(DOWN * 1.5)
        self.play(Write(prob), run_time=0.6)

        dec = Text("= 16.67%", font_size=32, color=EMERALD, font="Arial").move_to(DOWN * 2.4)
        self.play(Write(dec), run_time=0.5)

        # Show equal probability
        eq_text = Text("Each face is equally likely!", font_size=26, color=VIOLET, font="Arial")
        eq_text.move_to(DOWN * 3.2)
        self.play(Write(eq_text), run_time=0.6)
        self.wait(0.5)
