"""
Manim hook animations for NeuroMathica — Batch 3 (31 scenes).
Render all: python3 -m manim render -qm --format webm manim_scenes/hooks_batch3.py -a
Render one: python3 -m manim render -qm --format webm manim_scenes/hooks_batch3.py FunctionNotationHook
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


# ---------------------------------------------------------------------------
# ALGEBRA CONTINUED
# ---------------------------------------------------------------------------

class FunctionNotationHook(Scene):
    """AL: f(x) notation appearing over a function machine diagram."""
    def construct(self):
        self.camera.background_color = BG

        # Machine body
        box = RoundedRectangle(width=3, height=2.4, corner_radius=0.3,
                               color=INDIGO, fill_color=SURFACE, fill_opacity=0.6,
                               stroke_width=3)
        machine_label = Text("FUNCTION", font_size=24, color=INDIGO, font="Arial")
        machine_label.move_to(box)
        machine = VGroup(box, machine_label)

        # Input funnel (top)
        funnel = Polygon(
            UP * 1.2 + LEFT * 1, UP * 1.2 + RIGHT * 1,
            UP * 0.3 + RIGHT * 0.3, UP * 0.3 + LEFT * 0.3,
            color=CYAN, fill_color=CYAN, fill_opacity=0.2, stroke_width=2
        ).shift(UP * 0.9)

        # Output chute (bottom)
        chute = Polygon(
            DOWN * 0.3 + LEFT * 0.3, DOWN * 0.3 + RIGHT * 0.3,
            DOWN * 1.2 + RIGHT * 0.6, DOWN * 1.2 + LEFT * 0.6,
            color=EMERALD, fill_color=EMERALD, fill_opacity=0.2, stroke_width=2
        ).shift(DOWN * 0.9)

        self.play(FadeIn(machine), FadeIn(funnel), FadeIn(chute), run_time=0.8)

        # Feed x into machine
        x_in = Text("x = 3", font_size=36, color=CYAN, font="Arial")
        x_in.move_to(UP * 3.2)
        self.play(Write(x_in), run_time=0.5)
        self.play(x_in.animate.move_to(UP * 1.8), run_time=0.5)
        self.play(FadeOut(x_in), Flash(box, color=INDIGO), run_time=0.4)

        # Output
        y_out = Text("f(3) = 9", font_size=36, color=EMERALD, font="Arial")
        y_out.move_to(DOWN * 2.5)
        self.play(FadeIn(y_out, shift=DOWN * 0.5), run_time=0.5)
        self.wait(0.4)

        # Show notation
        notation = Text("f(x) = x²", font_size=56, color=AMBER, font="Arial")
        notation.move_to(UP * 3)
        self.play(Write(notation), run_time=1)

        subtitle = Text("A function names its rule", font_size=28, color=TEXT_SECONDARY, font="Arial")
        subtitle.move_to(DOWN * 3.5)
        self.play(FadeIn(subtitle), run_time=0.6)
        self.wait(0.5)


class PolynomialsHook(Scene):
    """AL: Terms assembling into a polynomial."""
    def construct(self):
        self.camera.background_color = BG

        term1 = Text("3x²", font_size=56, color=VIOLET, font="Arial")
        term2 = Text("+ 2x", font_size=56, color=BLUE, font="Arial")
        term3 = Text("- 5", font_size=56, color=EMERALD, font="Arial")

        term1.move_to(LEFT * 5)
        term2.move_to(LEFT * 5)
        term3.move_to(RIGHT * 5)

        self.play(term1.animate.move_to(LEFT * 2), run_time=0.8)
        self.play(term2.animate.move_to(ORIGIN + RIGHT * 0.3), run_time=0.7)
        self.play(term3.animate.move_to(RIGHT * 2.5), run_time=0.7)
        self.wait(0.3)

        # Brace underneath
        poly = VGroup(term1, term2, term3)
        brace = Brace(poly, DOWN, color=AMBER)
        brace_label = Text("Polynomial", font_size=36, color=AMBER, font="Arial")
        brace_label.next_to(brace, DOWN, buff=0.3)
        self.play(FadeIn(brace), Write(brace_label), run_time=0.8)
        self.wait(0.3)

        # Degree annotation
        deg = Text("Degree 2 (highest power of x)", font_size=26, color=TEXT_SECONDARY, font="Arial")
        deg.move_to(UP * 2.5)
        arrow = Arrow(deg.get_bottom(), term1.get_top() + UP * 0.1, color=VIOLET, stroke_width=2)
        self.play(Write(deg), Create(arrow), run_time=0.8)
        self.wait(0.5)


class PolynomialOpsHook(Scene):
    """AL: Two polynomials combining with like terms merging."""
    def construct(self):
        self.camera.background_color = BG

        poly1 = Text("(2x + 3)", font_size=48, color=BLUE, font="Arial")
        plus = Text("+", font_size=48, color=TEXT_PRIMARY, font="Arial")
        poly2 = Text("(x - 1)", font_size=48, color=EMERALD, font="Arial")

        row = VGroup(poly1, plus, poly2).arrange(RIGHT, buff=0.4)
        row.move_to(UP * 1.5)

        self.play(FadeIn(poly1, shift=LEFT), run_time=0.6)
        self.play(FadeIn(plus), FadeIn(poly2, shift=RIGHT), run_time=0.6)
        self.wait(0.4)

        # Expanded terms
        t_2x = Text("2x", font_size=44, color=BLUE, font="Arial")
        t_x = Text("x", font_size=44, color=EMERALD, font="Arial")
        t_3 = Text("+3", font_size=44, color=BLUE, font="Arial")
        t_m1 = Text("-1", font_size=44, color=EMERALD, font="Arial")

        t_2x.move_to(LEFT * 2.5 + DOWN * 0.3)
        t_x.move_to(LEFT * 1 + DOWN * 0.3)
        t_3.move_to(RIGHT * 1 + DOWN * 0.3)
        t_m1.move_to(RIGHT * 2.5 + DOWN * 0.3)

        self.play(FadeIn(t_2x), FadeIn(t_x), FadeIn(t_3), FadeIn(t_m1), run_time=0.6)
        self.wait(0.3)

        # Merge like terms
        like_x = Text("3x", font_size=52, color=INDIGO, font="Arial").move_to(LEFT * 1.5 + DOWN * 1.8)
        like_c = Text("+ 2", font_size=52, color=AMBER, font="Arial").move_to(RIGHT * 1 + DOWN * 1.8)

        self.play(
            ReplacementTransform(t_2x, like_x), ReplacementTransform(t_x, like_x.copy()),
            ReplacementTransform(t_3, like_c), ReplacementTransform(t_m1, like_c.copy()),
            run_time=1
        )
        self.wait(0.3)

        result = Text("= 3x + 2", font_size=56, color=AMBER, font="Arial")
        result.move_to(DOWN * 3)
        self.play(Write(result), run_time=0.8)
        self.wait(0.5)


class FactoringHook(Scene):
    """AL: Reverse of expanding — terms splitting apart."""
    def construct(self):
        self.camera.background_color = BG

        # Start with expanded form
        expanded = Text("6x² + 9x", font_size=52, color=TEXT_PRIMARY, font="Arial")
        expanded.move_to(UP * 2)
        self.play(Write(expanded), run_time=0.8)
        self.wait(0.4)

        # Show the common factor being pulled out
        arrow_down = Arrow(UP * 1.2, DOWN * 0.2, color=AMBER, stroke_width=3)
        find_gcf = Text("Find the GCF: 3x", font_size=30, color=AMBER, font="Arial")
        find_gcf.move_to(RIGHT * 3.5)
        self.play(Create(arrow_down), Write(find_gcf), run_time=0.7)

        # Split into factors
        factor_out = Text("3x", font_size=52, color=EMERALD, font="Arial")
        factor_out.move_to(LEFT * 2.2 + DOWN * 1.2)
        paren = Text("(2x + 3)", font_size=52, color=VIOLET, font="Arial")
        paren.move_to(RIGHT * 1 + DOWN * 1.2)

        self.play(
            FadeIn(factor_out, shift=LEFT * 0.5),
            FadeIn(paren, shift=RIGHT * 0.5),
            run_time=0.8
        )
        self.wait(0.3)

        # Combine
        result = Text("3x(2x + 3)", font_size=56, color=AMBER, font="Arial")
        result.move_to(DOWN * 3)
        self.play(Write(result), run_time=0.8)

        insight = Text("Factoring = reverse distribution", font_size=26, color=CYAN, font="Arial")
        insight.move_to(DOWN * 3.8)
        self.play(FadeIn(insight), run_time=0.5)
        self.wait(0.5)


class QuadraticEquationsHook(Scene):
    """AL: Ball follows parabola, finding where it hits the ground."""
    def construct(self):
        self.camera.background_color = BG

        # Axes
        axes = Axes(
            x_range=[-3.5, 3.5, 1], y_range=[-1, 5, 1],
            x_length=8, y_length=5,
            axis_config={"color": TEXT_SECONDARY, "stroke_width": 1},
            tips=False
        ).shift(DOWN * 0.5)

        ground_line = axes.get_horizontal_line(axes.c2p(3.5, 0), color=EMERALD, stroke_width=2)

        # Parabola y = -x² + 4
        parabola = axes.plot(lambda x: -x**2 + 4, x_range=[-2.5, 2.5],
                             color=AMBER, stroke_width=3)

        self.play(Create(axes), Create(ground_line), run_time=0.6)
        self.play(Create(parabola), run_time=1)

        # Ball following the curve
        ball = Dot(color=ROSE, radius=0.12)
        ball.move_to(axes.c2p(-2, 0))
        self.play(FadeIn(ball), run_time=0.3)
        self.play(MoveAlongPath(ball, parabola), run_time=2)
        self.wait(0.2)

        # Mark roots
        root_l = Dot(axes.c2p(-2, 0), color=CYAN, radius=0.1)
        root_r = Dot(axes.c2p(2, 0), color=CYAN, radius=0.1)
        label_l = Text("x = -2", font_size=24, color=CYAN, font="Arial").next_to(root_l, DOWN, buff=0.2)
        label_r = Text("x = 2", font_size=24, color=CYAN, font="Arial").next_to(root_r, DOWN, buff=0.2)
        self.play(FadeIn(root_l), FadeIn(root_r), Write(label_l), Write(label_r), run_time=0.7)

        eq = Text("x² - 4 = 0  =>  x = +/-2", font_size=32, color=AMBER, font="Arial")
        eq.move_to(UP * 3.2)
        self.play(Write(eq), run_time=0.8)
        self.wait(0.5)


class SequencesHook(Scene):
    """AL: Fibonacci visual — squares building the golden spiral."""
    def construct(self):
        self.camera.background_color = BG

        fibs = [1, 1, 2, 3, 5, 8, 13]
        colors = [INDIGO, CYAN, EMERALD, AMBER, ROSE, VIOLET, BLUE]

        # Show numbers first
        nums = VGroup()
        for i, f in enumerate(fibs):
            t = Text(str(f), font_size=40, color=colors[i], font="Arial")
            nums.add(t)
        nums.arrange(RIGHT, buff=0.5)
        nums.move_to(UP * 3)

        for i, n in enumerate(nums):
            self.play(FadeIn(n, shift=UP * 0.3), run_time=0.25)

        self.wait(0.3)

        # Build Fibonacci squares (simplified — stacking)
        scale = 0.18
        squares = VGroup()
        positions = [ORIGIN]
        # Just build first few squares to suggest the spiral
        dirs = [RIGHT, UP, LEFT, DOWN]  # spiral directions
        current = ORIGIN
        for i, f in enumerate(fibs[:6]):
            sq = Square(side_length=f * scale, color=colors[i],
                        fill_opacity=0.15, stroke_width=2)
            if i == 0:
                sq.move_to(LEFT * 1 + DOWN * 0.5)
                current = sq.get_center()
            elif i == 1:
                sq.next_to(squares[0], RIGHT, buff=0)
            elif i == 2:
                sq.next_to(VGroup(squares[0], squares[1]), UP, buff=0)
                sq.align_to(squares[0], LEFT)
            elif i == 3:
                sq.next_to(VGroup(squares[0], squares[2]), LEFT, buff=0)
                sq.align_to(squares[2], UP)
            elif i == 4:
                sq.next_to(VGroup(squares[3], squares[0], squares[1]), DOWN, buff=0)
                sq.align_to(squares[3], LEFT)
            elif i == 5:
                sq.next_to(VGroup(squares[1], squares[4]), RIGHT, buff=0)
                sq.align_to(squares[4], DOWN)
            squares.add(sq)
            self.play(FadeIn(sq), run_time=0.35)

        self.wait(0.2)

        title = Text("Fibonacci: Nature's sequence", font_size=30, color=AMBER, font="Arial")
        title.move_to(DOWN * 3.3)
        self.play(Write(title), run_time=0.7)
        self.wait(0.5)


class VariationHook(Scene):
    """AL: Direct vs inverse variation — two graphs side by side."""
    def construct(self):
        self.camera.background_color = BG

        # Left axes: direct variation y = 2x
        ax_left = Axes(
            x_range=[0, 5, 1], y_range=[0, 10, 2],
            x_length=4, y_length=3.5,
            axis_config={"color": TEXT_SECONDARY, "stroke_width": 1},
            tips=False
        ).shift(LEFT * 3.2 + DOWN * 0.3)

        # Right axes: inverse variation y = 10/x
        ax_right = Axes(
            x_range=[0.5, 5, 1], y_range=[0, 10, 2],
            x_length=4, y_length=3.5,
            axis_config={"color": TEXT_SECONDARY, "stroke_width": 1},
            tips=False
        ).shift(RIGHT * 3.2 + DOWN * 0.3)

        direct = ax_left.plot(lambda x: 2 * x, x_range=[0, 4.5], color=BLUE, stroke_width=3)
        inverse = ax_right.plot(lambda x: 10 / x, x_range=[1, 5], color=ROSE, stroke_width=3)

        l_title = Text("Direct: y = kx", font_size=28, color=BLUE, font="Arial")
        l_title.next_to(ax_left, UP, buff=0.3)
        r_title = Text("Inverse: y = k/x", font_size=28, color=ROSE, font="Arial")
        r_title.next_to(ax_right, UP, buff=0.3)

        self.play(Create(ax_left), Create(ax_right), run_time=0.6)
        self.play(Write(l_title), Write(r_title), run_time=0.6)
        self.play(Create(direct), Create(inverse), run_time=1.2)
        self.wait(0.3)

        l_note = Text("x goes up, y goes up", font_size=22, color=CYAN, font="Arial")
        l_note.next_to(ax_left, DOWN, buff=0.4)
        r_note = Text("x goes up, y goes down", font_size=22, color=CYAN, font="Arial")
        r_note.next_to(ax_right, DOWN, buff=0.4)
        self.play(Write(l_note), Write(r_note), run_time=0.8)
        self.wait(0.5)


# ---------------------------------------------------------------------------
# GEOMETRY CONTINUED
# ---------------------------------------------------------------------------

class TrianglePropsHook(Scene):
    """GE: Triangle inequality — sticks that can't vs can form a triangle."""
    def construct(self):
        self.camera.background_color = BG

        title = Text("Can these make a triangle?", font_size=32, color=TEXT_PRIMARY, font="Arial")
        title.move_to(UP * 3.2)
        self.play(Write(title), run_time=0.6)

        # Fail case: 1, 2, 5
        s1 = Line(LEFT * 0.5, LEFT * 0.5 + RIGHT * 0.5, color=ROSE, stroke_width=6)
        s2 = Line(LEFT * 0.5, LEFT * 0.5 + RIGHT * 1, color=ROSE, stroke_width=6)
        s3 = Line(LEFT * 0.5, LEFT * 0.5 + RIGHT * 2.5, color=ROSE, stroke_width=6)

        fail_group = VGroup(s1, s2, s3).arrange(DOWN, buff=0.3)
        fail_group.move_to(LEFT * 3 + UP * 0.5)

        l1 = Text("1", font_size=28, color=ROSE, font="Arial").next_to(s1, RIGHT, buff=0.3)
        l2 = Text("2", font_size=28, color=ROSE, font="Arial").next_to(s2, RIGHT, buff=0.3)
        l3 = Text("5", font_size=28, color=ROSE, font="Arial").next_to(s3, RIGHT, buff=0.3)

        self.play(Create(s1), Create(s2), Create(s3), FadeIn(l1), FadeIn(l2), FadeIn(l3), run_time=0.7)
        self.wait(0.2)

        # X mark
        fail_mark = Text("1 + 2 < 5  NO!", font_size=28, color=ROSE, font="Arial")
        fail_mark.move_to(LEFT * 3 + DOWN * 1.5)
        self.play(Write(fail_mark), run_time=0.6)
        self.wait(0.3)

        # Success case: 3, 4, 5
        tri = Polygon(
            RIGHT * 1, RIGHT * 5, RIGHT * 5 + UP * 3,
            color=EMERALD, fill_opacity=0.15, stroke_width=3
        ).scale(0.55).move_to(RIGHT * 3 + UP * 0.5)

        la = Text("3", font_size=28, color=EMERALD, font="Arial").next_to(tri, DOWN, buff=0.15)
        lb = Text("4", font_size=28, color=EMERALD, font="Arial").next_to(tri, RIGHT, buff=0.15)
        lc = Text("5", font_size=28, color=EMERALD, font="Arial").next_to(tri, LEFT, buff=0.15)

        self.play(Create(tri), FadeIn(la), FadeIn(lb), FadeIn(lc), run_time=0.7)

        pass_mark = Text("3 + 4 > 5  YES!", font_size=28, color=EMERALD, font="Arial")
        pass_mark.move_to(RIGHT * 3 + DOWN * 1.5)
        self.play(Write(pass_mark), run_time=0.6)

        rule = Text("Sum of two sides must exceed the third", font_size=26, color=AMBER, font="Arial")
        rule.move_to(DOWN * 3)
        self.play(Write(rule), run_time=0.7)
        self.wait(0.5)


class CircleMeasurementsHook(Scene):
    """GE: Rolling a circle along a line — one revolution = circumference."""
    def construct(self):
        self.camera.background_color = BG

        # Ground line
        ground = Line(LEFT * 6, RIGHT * 6, color=TEXT_SECONDARY, stroke_width=1)
        ground.move_to(DOWN * 2)

        radius = 0.8
        circle = Circle(radius=radius, color=BLUE, stroke_width=3)
        dot_mark = Dot(circle.get_top(), color=AMBER, radius=0.08)
        circ_group = VGroup(circle, dot_mark)
        circ_group.move_to(LEFT * 4.5 + DOWN * 2 + UP * radius)

        self.play(FadeIn(ground), FadeIn(circ_group), run_time=0.5)

        # Roll the circle
        circumference = 2 * PI * radius
        end_x = -4.5 + circumference

        trace = Line(LEFT * 4.5 + DOWN * 2, LEFT * 4.5 + DOWN * 2,
                     color=EMERALD, stroke_width=4)

        # Animate rolling
        self.play(
            Rotate(circ_group, angle=-2 * PI, about_point=circle.get_center()),
            circ_group.animate.shift(RIGHT * circumference),
            trace.animate.put_start_and_end_on(
                LEFT * 4.5 + DOWN * 2,
                np.array([end_x, -2, 0])
            ),
            run_time=2
        )
        self.wait(0.3)

        # Label
        c_label = Text("Circumference", font_size=28, color=EMERALD, font="Arial")
        c_label.next_to(trace, DOWN, buff=0.3)
        self.play(Write(c_label), run_time=0.5)

        formula = Text("C = pi x d", font_size=48, color=AMBER, font="Arial")
        formula.move_to(UP * 2)
        self.play(Write(formula), run_time=0.8)

        subtitle = Text("One full revolution = the circumference!", font_size=26, color=CYAN, font="Arial")
        subtitle.move_to(UP * 1)
        self.play(FadeIn(subtitle), run_time=0.5)
        self.wait(0.5)


class AreaCompositeHook(Scene):
    """GE: L-shaped figure splitting into two rectangles."""
    def construct(self):
        self.camera.background_color = BG

        # L-shape as polygon
        l_shape = Polygon(
            LEFT * 2 + UP * 2,
            RIGHT * 2 + UP * 2,
            RIGHT * 2 + DOWN * 0,
            RIGHT * 0 + DOWN * 0,
            RIGHT * 0 + DOWN * 2,
            LEFT * 2 + DOWN * 2,
            color=INDIGO, fill_color=INDIGO, fill_opacity=0.15, stroke_width=3
        )

        self.play(Create(l_shape), run_time=0.8)
        self.wait(0.3)

        question = Text("Area = ?", font_size=36, color=TEXT_PRIMARY, font="Arial")
        question.move_to(UP * 3.2)
        self.play(Write(question), run_time=0.5)

        # Dashed splitting line
        split = DashedLine(
            RIGHT * 0 + UP * 2, RIGHT * 0 + DOWN * 0,
            color=AMBER, stroke_width=2, dash_length=0.15
        )
        self.play(Create(split), run_time=0.5)

        # Separate into two rectangles
        rect_a = Polygon(
            LEFT * 2 + UP * 2, RIGHT * 0 + UP * 2,
            RIGHT * 0 + DOWN * 2, LEFT * 2 + DOWN * 2,
            color=BLUE, fill_color=BLUE, fill_opacity=0.2, stroke_width=3
        )
        rect_b = Polygon(
            RIGHT * 0 + UP * 2, RIGHT * 2 + UP * 2,
            RIGHT * 2 + DOWN * 0, RIGHT * 0 + DOWN * 0,
            color=EMERALD, fill_color=EMERALD, fill_opacity=0.2, stroke_width=3
        )

        self.play(
            FadeOut(l_shape),
            rect_a.animate.shift(LEFT * 0.3),
            rect_b.animate.shift(RIGHT * 0.3),
            run_time=0.8
        )

        # Labels
        a_label = Text("2 x 4 = 8", font_size=28, color=BLUE, font="Arial")
        a_label.move_to(rect_a.get_center() + LEFT * 0.3)
        b_label = Text("2 x 2 = 4", font_size=28, color=EMERALD, font="Arial")
        b_label.move_to(rect_b.get_center() + RIGHT * 0.3)
        self.play(Write(a_label), Write(b_label), run_time=0.6)

        total = Text("Total = 8 + 4 = 12", font_size=36, color=AMBER, font="Arial")
        total.move_to(DOWN * 3.2)
        self.play(Write(total), run_time=0.7)
        self.wait(0.5)


class PythagoreanAppsHook(Scene):
    """GE: City grid — walking vs diagonal shortcut with distance formula."""
    def construct(self):
        self.camera.background_color = BG

        # Grid
        grid = VGroup()
        for i in range(-3, 4):
            grid.add(Line(LEFT * 3 + UP * i, RIGHT * 3 + UP * i,
                          color=TEXT_SECONDARY, stroke_width=0.5))
            grid.add(Line(RIGHT * i + DOWN * 3, RIGHT * i + UP * 3,
                          color=TEXT_SECONDARY, stroke_width=0.5))
        grid.shift(DOWN * 0.3)
        self.play(FadeIn(grid), run_time=0.4)

        origin = DOWN * 0.3
        # Start and end points
        start = Dot(LEFT * 2 + DOWN * 2 + origin, color=EMERALD, radius=0.12)
        end = Dot(RIGHT * 1 + UP * 2 + origin, color=ROSE, radius=0.12)
        sl = Text("A", font_size=24, color=EMERALD, font="Arial").next_to(start, DOWN, buff=0.15)
        el = Text("B", font_size=24, color=ROSE, font="Arial").next_to(end, UP, buff=0.15)
        self.play(FadeIn(start), FadeIn(end), FadeIn(sl), FadeIn(el), run_time=0.4)

        # Walking path (L-shaped)
        walk_h = Line(LEFT * 2 + DOWN * 2 + origin, RIGHT * 1 + DOWN * 2 + origin,
                      color=BLUE, stroke_width=3)
        walk_v = Line(RIGHT * 1 + DOWN * 2 + origin, RIGHT * 1 + UP * 2 + origin,
                      color=BLUE, stroke_width=3)
        walk_label = Text("3 + 4 = 7 blocks", font_size=24, color=BLUE, font="Arial")
        walk_label.move_to(RIGHT * 4 + DOWN * 1)

        self.play(Create(walk_h), Create(walk_v), Write(walk_label), run_time=0.8)
        self.wait(0.3)

        # Diagonal shortcut
        diag = Line(LEFT * 2 + DOWN * 2 + origin, RIGHT * 1 + UP * 2 + origin,
                    color=AMBER, stroke_width=3)
        diag_label = Text("d = 5 blocks", font_size=24, color=AMBER, font="Arial")
        diag_label.move_to(LEFT * 3.5 + UP * 1)

        self.play(Create(diag), Write(diag_label), run_time=0.7)

        formula = Text("d = sqrt(3² + 4²) = 5", font_size=32, color=AMBER, font="Arial")
        formula.move_to(DOWN * 3.5)
        self.play(Write(formula), run_time=0.8)
        self.wait(0.5)


class SurfaceAreaHook(Scene):
    """GE: Box unfolding into 6 faces (net) then wrapping back up."""
    def construct(self):
        self.camera.background_color = BG

        # Show a 3D-looking box first (simple 2D representation)
        # Front face
        w, h, d = 2, 1.4, 1
        front = Rectangle(width=w, height=h, color=BLUE, fill_color=BLUE,
                          fill_opacity=0.15, stroke_width=2).move_to(ORIGIN)

        title = Text("Surface Area = total area of all faces", font_size=28,
                      color=TEXT_PRIMARY, font="Arial").move_to(UP * 3.2)
        self.play(Write(title), run_time=0.6)

        # Net: cross shape
        top = Rectangle(width=w, height=d, color=EMERALD, fill_color=EMERALD,
                        fill_opacity=0.15, stroke_width=2)
        bottom = Rectangle(width=w, height=d, color=EMERALD, fill_color=EMERALD,
                           fill_opacity=0.15, stroke_width=2)
        left_f = Rectangle(width=d, height=h, color=VIOLET, fill_color=VIOLET,
                           fill_opacity=0.15, stroke_width=2)
        right_f = Rectangle(width=d, height=h, color=VIOLET, fill_color=VIOLET,
                            fill_opacity=0.15, stroke_width=2)
        back = Rectangle(width=w, height=h, color=ROSE, fill_color=ROSE,
                         fill_opacity=0.15, stroke_width=2)

        # Arrange as net
        front.move_to(ORIGIN)
        top.next_to(front, UP, buff=0)
        bottom.next_to(front, DOWN, buff=0)
        left_f.next_to(front, LEFT, buff=0)
        right_f.next_to(front, RIGHT, buff=0)
        back.next_to(top, UP, buff=0)

        net = VGroup(front, top, bottom, left_f, right_f, back)
        net.move_to(DOWN * 0.3)

        # Animate each face appearing
        self.play(FadeIn(front), run_time=0.3)
        self.play(FadeIn(top, shift=UP * 0.3), run_time=0.3)
        self.play(FadeIn(bottom, shift=DOWN * 0.3), run_time=0.3)
        self.play(FadeIn(left_f, shift=LEFT * 0.3), run_time=0.3)
        self.play(FadeIn(right_f, shift=RIGHT * 0.3), run_time=0.3)
        self.play(FadeIn(back, shift=UP * 0.3), run_time=0.3)

        # Label faces
        labels = VGroup(
            Text("Front", font_size=16, color=BLUE, font="Arial").move_to(front),
            Text("Top", font_size=16, color=EMERALD, font="Arial").move_to(top),
            Text("Bottom", font_size=16, color=EMERALD, font="Arial").move_to(bottom),
            Text("Left", font_size=16, color=VIOLET, font="Arial").move_to(left_f),
            Text("Right", font_size=16, color=VIOLET, font="Arial").move_to(right_f),
            Text("Back", font_size=16, color=ROSE, font="Arial").move_to(back),
        )
        self.play(*[FadeIn(l) for l in labels], run_time=0.5)

        count = Text("6 faces total!", font_size=36, color=AMBER, font="Arial")
        count.move_to(DOWN * 3.3)
        self.play(Write(count), run_time=0.6)
        self.wait(0.5)


class CrossSectionsHook(Scene):
    """GE: Knife slicing through a cone at different angles."""
    def construct(self):
        self.camera.background_color = BG

        title = Text("Slicing a Cone", font_size=36, color=TEXT_PRIMARY, font="Arial")
        title.move_to(UP * 3.2)
        self.play(Write(title), run_time=0.5)

        # Draw cone (2D side view)
        cone = Polygon(
            UP * 2, LEFT * 1.2 + DOWN * 1.5, RIGHT * 1.2 + DOWN * 1.5,
            color=TEXT_SECONDARY, fill_color=SURFACE, fill_opacity=0.3, stroke_width=2
        ).move_to(LEFT * 4)

        self.play(Create(cone), run_time=0.5)

        # Three cross sections
        shapes_data = [
            ("Horizontal cut", Circle(radius=0.6, color=BLUE, stroke_width=3), "Circle"),
            ("Angled cut", Ellipse(width=1.4, height=0.8, color=EMERALD, stroke_width=3), "Ellipse"),
            ("Parallel to side", FunctionGraph(lambda x: 0.3 * x**2, x_range=[-1, 1],
                                               color=ROSE, stroke_width=3), "Parabola"),
        ]

        x_positions = [-1, 2, 5]
        for i, (cut_label, shape, name) in enumerate(shapes_data):
            shape.move_to(RIGHT * x_positions[i] * 0.9 + DOWN * 0.3)
            cl = Text(cut_label, font_size=20, color=TEXT_SECONDARY, font="Arial")
            cl.next_to(shape, UP, buff=0.4)
            nl = Text(name, font_size=28, color=[BLUE, EMERALD, ROSE][i], font="Arial")
            nl.next_to(shape, DOWN, buff=0.4)

            self.play(Create(shape), Write(cl), Write(nl), run_time=0.7)
            self.wait(0.2)

        self.wait(0.5)


class TransformationsHook(Scene):
    """GE: Triangle translated, reflected, rotated, dilated."""
    def construct(self):
        self.camera.background_color = BG

        tri = Polygon(
            ORIGIN, RIGHT * 1.2, RIGHT * 0.6 + UP * 1,
            color=INDIGO, fill_color=INDIGO, fill_opacity=0.25, stroke_width=2
        )

        label_style = {"font_size": 22, "font": "Arial"}

        # 1. Translate
        tri1 = tri.copy().move_to(LEFT * 4.5 + UP * 1.5)
        tri1_moved = tri1.copy().shift(RIGHT * 1.2 + DOWN * 0.5)
        tri1_moved.set_color(BLUE)
        l1 = Text("Translate", color=BLUE, **label_style).move_to(LEFT * 4 + DOWN * 0.5)
        arrow1 = Arrow(tri1.get_center(), tri1_moved.get_center(), color=BLUE,
                       stroke_width=2, buff=0.3)

        self.play(FadeIn(tri1), Write(l1), run_time=0.4)
        self.play(Create(arrow1), FadeIn(tri1_moved), run_time=0.5)

        # 2. Reflect
        tri2 = tri.copy().move_to(LEFT * 1 + UP * 1.5)
        mirror = DashedLine(LEFT * 1 + UP * 2.5, LEFT * 1 + DOWN * 0.2,
                            color=AMBER, stroke_width=1.5)
        tri2_ref = tri2.copy().flip(RIGHT).move_to(RIGHT * 0.2 + UP * 1.5)
        tri2_ref.set_color(EMERALD)
        l2 = Text("Reflect", color=EMERALD, **label_style).move_to(LEFT * 0.4 + DOWN * 0.5)

        self.play(FadeIn(tri2), Create(mirror), Write(l2), run_time=0.4)
        self.play(FadeIn(tri2_ref), run_time=0.4)

        # 3. Rotate
        tri3 = tri.copy().move_to(RIGHT * 2.5 + UP * 1.5)
        tri3_rot = tri3.copy().rotate(PI / 3, about_point=tri3.get_center())
        tri3_rot.set_color(ROSE)
        l3 = Text("Rotate", color=ROSE, **label_style).move_to(RIGHT * 2.5 + DOWN * 0.5)
        arc = Arc(radius=0.5, angle=PI / 3, color=ROSE, stroke_width=2).move_to(tri3.get_center())

        self.play(FadeIn(tri3), Write(l3), run_time=0.4)
        self.play(Create(arc), FadeIn(tri3_rot), run_time=0.5)

        # 4. Dilate
        tri4 = tri.copy().scale(0.6).move_to(RIGHT * 5 + UP * 1.5)
        tri4_big = tri4.copy().scale(1.8)
        tri4_big.set_color(VIOLET)
        l4 = Text("Dilate", color=VIOLET, **label_style).move_to(RIGHT * 5 + DOWN * 0.5)

        self.play(FadeIn(tri4), Write(l4), run_time=0.4)
        self.play(FadeIn(tri4_big), run_time=0.5)

        # Bottom message
        msg = Text("Four types of geometric transformations", font_size=26,
                    color=CYAN, font="Arial")
        msg.move_to(DOWN * 2)
        self.play(Write(msg), run_time=0.7)
        self.wait(0.5)


class CongruenceHook(Scene):
    """GE: Two identical puzzle pieces sliding together — exact match."""
    def construct(self):
        self.camera.background_color = BG

        # Two identical shapes (irregular quadrilaterals)
        shape_pts = [
            LEFT * 1 + UP * 0.5,
            RIGHT * 0.5 + UP * 1,
            RIGHT * 1.2 + DOWN * 0.2,
            LEFT * 0.3 + DOWN * 0.8,
        ]

        piece1 = Polygon(*shape_pts, color=BLUE, fill_color=BLUE,
                         fill_opacity=0.2, stroke_width=3)
        piece2 = Polygon(*shape_pts, color=EMERALD, fill_color=EMERALD,
                         fill_opacity=0.2, stroke_width=3)

        piece1.move_to(LEFT * 3.5)
        piece2.move_to(RIGHT * 3.5)

        l1 = Text("Shape A", font_size=24, color=BLUE, font="Arial")
        l1.next_to(piece1, DOWN, buff=0.3)
        l2 = Text("Shape B", font_size=24, color=EMERALD, font="Arial")
        l2.next_to(piece2, DOWN, buff=0.3)

        self.play(FadeIn(piece1), FadeIn(piece2), Write(l1), Write(l2), run_time=0.7)
        self.wait(0.3)

        # Slide together
        self.play(
            piece1.animate.move_to(LEFT * 0.5),
            piece2.animate.move_to(LEFT * 0.5),
            FadeOut(l1), FadeOut(l2),
            run_time=1.2
        )

        # Flash of match
        self.play(Flash(piece1.get_center(), color=AMBER, num_lines=12), run_time=0.4)

        match_text = Text("CONGRUENT", font_size=56, color=AMBER, font="Arial")
        match_text.move_to(UP * 2.5)
        self.play(Write(match_text), run_time=0.6)

        subtitle = Text("Same shape, same size — exact match!", font_size=28,
                         color=CYAN, font="Arial")
        subtitle.move_to(DOWN * 2.5)
        self.play(Write(subtitle), run_time=0.7)
        self.wait(0.5)


class SimilarityHook(Scene):
    """GE: Small photo enlarging — same shape, different size."""
    def construct(self):
        self.camera.background_color = BG

        # Small "photo" (rectangle with content)
        small = Rectangle(width=1.5, height=1, color=BLUE, fill_color=SURFACE,
                          fill_opacity=0.4, stroke_width=2)
        small_star = Star(n=5, outer_radius=0.3, color=AMBER, fill_opacity=0.5, stroke_width=1)
        small_star.move_to(small)
        small_group = VGroup(small, small_star).move_to(LEFT * 3 + UP * 0.5)

        s_label = Text("3 x 2", font_size=22, color=BLUE, font="Arial")
        s_label.next_to(small_group, DOWN, buff=0.3)

        self.play(FadeIn(small_group), Write(s_label), run_time=0.6)
        self.wait(0.3)

        # Arrow
        arrow = Arrow(LEFT * 1.5, RIGHT * 1, color=CYAN, stroke_width=3)
        times = Text("x 2", font_size=28, color=CYAN, font="Arial")
        times.next_to(arrow, UP, buff=0.15)
        self.play(Create(arrow), Write(times), run_time=0.5)

        # Large "photo"
        big = Rectangle(width=3, height=2, color=EMERALD, fill_color=SURFACE,
                        fill_opacity=0.4, stroke_width=2)
        big_star = Star(n=5, outer_radius=0.6, color=AMBER, fill_opacity=0.5, stroke_width=1)
        big_star.move_to(big)
        big_group = VGroup(big, big_star).move_to(RIGHT * 3 + UP * 0.5)

        b_label = Text("6 x 4", font_size=22, color=EMERALD, font="Arial")
        b_label.next_to(big_group, DOWN, buff=0.3)

        self.play(FadeIn(big_group), Write(b_label), run_time=0.6)
        self.wait(0.3)

        # Proportions
        prop = Text("3/6 = 2/4 = 1/2", font_size=32, color=AMBER, font="Arial")
        prop.move_to(DOWN * 2.2)
        self.play(Write(prop), run_time=0.7)

        similar = Text("SIMILAR: same shape, proportional sides",
                       font_size=28, color=CYAN, font="Arial")
        similar.move_to(DOWN * 3.2)
        self.play(Write(similar), run_time=0.7)
        self.wait(0.5)


class CoordinateGeometryHook(Scene):
    """GE: Two points on a grid with right triangle showing distance formula."""
    def construct(self):
        self.camera.background_color = BG

        axes = Axes(
            x_range=[-1, 8, 1], y_range=[-1, 6, 1],
            x_length=7, y_length=5,
            axis_config={"color": TEXT_SECONDARY, "stroke_width": 1,
                         "include_numbers": False},
            tips=False
        ).shift(LEFT * 0.5 + DOWN * 0.3)
        axes_labels = add_axes_labels(axes, [-1, 8, 1], [-1, 6, 1], font_size=20, color=TEXT_PRIMARY)

        self.play(Create(axes), FadeIn(axes_labels), run_time=0.5)

        # Two points
        p1 = axes.c2p(1, 1)
        p2 = axes.c2p(5, 4)
        dot1 = Dot(p1, color=BLUE, radius=0.1)
        dot2 = Dot(p2, color=ROSE, radius=0.1)
        l1 = Text("(1, 1)", font_size=22, color=BLUE, font="Arial").next_to(dot1, DOWN, buff=0.2)
        l2 = Text("(5, 4)", font_size=22, color=ROSE, font="Arial").next_to(dot2, UP, buff=0.2)

        self.play(FadeIn(dot1), FadeIn(dot2), Write(l1), Write(l2), run_time=0.5)

        # Right triangle
        corner = axes.c2p(5, 1)
        h_line = DashedLine(p1, corner, color=EMERALD, stroke_width=2)
        v_line = DashedLine(corner, p2, color=EMERALD, stroke_width=2)
        hyp = Line(p1, p2, color=AMBER, stroke_width=3)

        dx_label = Text("4", font_size=24, color=EMERALD, font="Arial")
        dx_label.next_to(h_line, DOWN, buff=0.15)
        dy_label = Text("3", font_size=24, color=EMERALD, font="Arial")
        dy_label.next_to(v_line, RIGHT, buff=0.15)

        self.play(Create(h_line), Create(v_line), Write(dx_label), Write(dy_label), run_time=0.7)
        self.play(Create(hyp), run_time=0.5)

        d_label = Text("d = 5", font_size=28, color=AMBER, font="Arial")
        d_label.next_to(hyp, LEFT, buff=0.2).shift(UP * 0.2)
        self.play(Write(d_label), run_time=0.4)

        formula = Text("d = sqrt((x2-x1)² + (y2-y1)²)", font_size=28,
                       color=CYAN, font="Arial")
        formula.move_to(UP * 3)
        self.play(Write(formula), run_time=0.8)
        self.wait(0.5)


class ConstructionsHook(Scene):
    """GE: Compass drawing two arcs to create perpendicular bisector."""
    def construct(self):
        self.camera.background_color = BG

        # Segment
        A = LEFT * 2.5
        B = RIGHT * 2.5
        segment = Line(A, B, color=TEXT_PRIMARY, stroke_width=3)
        dot_a = Dot(A, color=BLUE, radius=0.08)
        dot_b = Dot(B, color=BLUE, radius=0.08)
        la = Text("A", font_size=22, color=BLUE, font="Arial").next_to(dot_a, DOWN, buff=0.15)
        lb = Text("B", font_size=22, color=BLUE, font="Arial").next_to(dot_b, DOWN, buff=0.15)

        self.play(Create(segment), FadeIn(dot_a), FadeIn(dot_b), Write(la), Write(lb), run_time=0.6)

        # Arc from A
        arc_a_top = Arc(radius=3, start_angle=20 * DEGREES, angle=50 * DEGREES,
                        color=EMERALD, stroke_width=2).shift(A)
        arc_a_bot = Arc(radius=3, start_angle=-70 * DEGREES, angle=50 * DEGREES,
                        color=EMERALD, stroke_width=2).shift(A)

        self.play(Create(arc_a_top), Create(arc_a_bot), run_time=0.7)

        # Arc from B
        arc_b_top = Arc(radius=3, start_angle=110 * DEGREES, angle=50 * DEGREES,
                        color=ROSE, stroke_width=2).shift(B)
        arc_b_bot = Arc(radius=3, start_angle=-160 * DEGREES, angle=50 * DEGREES,
                        color=ROSE, stroke_width=2).shift(B)

        self.play(Create(arc_b_top), Create(arc_b_bot), run_time=0.7)

        # Intersection points and perpendicular bisector
        mid = (A + B) / 2
        top_int = mid + UP * 2.2
        bot_int = mid + DOWN * 2.2
        bisector = Line(top_int, bot_int, color=AMBER, stroke_width=3)
        mid_dot = Dot(mid, color=AMBER, radius=0.1)

        self.play(Create(bisector), FadeIn(mid_dot), run_time=0.6)

        right_angle = Square(side_length=0.25, color=AMBER, stroke_width=1.5)
        right_angle.move_to(mid + UP * 0.125 + RIGHT * 0.125)
        self.play(FadeIn(right_angle), run_time=0.3)

        label = Text("Perpendicular Bisector", font_size=32, color=CYAN, font="Arial")
        label.move_to(UP * 3.3)
        self.play(Write(label), run_time=0.6)
        self.wait(0.5)


class AngleRelationshipsHook(Scene):
    """GE: Two lines crossing — vertical angles glow same color."""
    def construct(self):
        self.camera.background_color = BG

        # Two intersecting lines
        line1 = Line(LEFT * 3 + DOWN * 1.5, RIGHT * 3 + UP * 1.5,
                     color=TEXT_SECONDARY, stroke_width=3)
        line2 = Line(LEFT * 3 + UP * 1.5, RIGHT * 3 + DOWN * 1.5,
                     color=TEXT_SECONDARY, stroke_width=3)

        self.play(Create(line1), Create(line2), run_time=0.6)
        self.wait(0.3)

        # Highlight vertical angles (opposite pairs)
        # Pair 1: top and bottom
        angle_top = Sector(
            outer_radius=0.8, start_angle=PI / 4, angle=PI / 2,
            color=AMBER, fill_opacity=0.3, stroke_width=0
        )
        angle_bottom = Sector(
            outer_radius=0.8, start_angle=PI + PI / 4, angle=PI / 2,
            color=AMBER, fill_opacity=0.3, stroke_width=0
        )

        l_top = Text("a", font_size=28, color=AMBER, font="Arial").move_to(UP * 1)
        l_bottom = Text("a", font_size=28, color=AMBER, font="Arial").move_to(DOWN * 1)

        self.play(FadeIn(angle_top), FadeIn(angle_bottom),
                  Write(l_top), Write(l_bottom), run_time=0.6)
        self.wait(0.3)

        # Pair 2: left and right
        angle_left = Sector(
            outer_radius=0.8, start_angle=3 * PI / 4, angle=PI / 2,
            color=CYAN, fill_opacity=0.3, stroke_width=0
        )
        angle_right = Sector(
            outer_radius=0.8, start_angle=-PI / 4, angle=PI / 2,
            color=CYAN, fill_opacity=0.3, stroke_width=0
        )

        l_left = Text("b", font_size=28, color=CYAN, font="Arial").move_to(LEFT * 1)
        l_right = Text("b", font_size=28, color=CYAN, font="Arial").move_to(RIGHT * 1)

        self.play(FadeIn(angle_left), FadeIn(angle_right),
                  Write(l_left), Write(l_right), run_time=0.6)
        self.wait(0.3)

        # Rule
        rule = Text("Vertical angles are EQUAL", font_size=36, color=AMBER, font="Arial")
        rule.move_to(DOWN * 3)
        self.play(Write(rule), run_time=0.7)

        eq = Text("a = a,  b = b", font_size=28, color=TEXT_SECONDARY, font="Arial")
        eq.move_to(DOWN * 3.7)
        self.play(Write(eq), run_time=0.5)
        self.wait(0.5)


class GE4_7aHook(Scene):
    """GE: 3D box rotating showing each face highlighted one at a time."""
    def construct(self):
        self.camera.background_color = BG

        title = Text("Surface Area: Count Every Face", font_size=32,
                      color=TEXT_PRIMARY, font="Arial")
        title.move_to(UP * 3.2)
        self.play(Write(title), run_time=0.5)

        # 2D representation of a 3D box (isometric-like)
        w, h = 2.5, 1.8
        offset = np.array([0.8, 0.5, 0])

        # Front face
        front = Polygon(
            np.array([-w/2, -h/2, 0]), np.array([w/2, -h/2, 0]),
            np.array([w/2, h/2, 0]), np.array([-w/2, h/2, 0]),
            color=TEXT_SECONDARY, fill_opacity=0.05, stroke_width=2
        )
        # Top face
        top_f = Polygon(
            np.array([-w/2, h/2, 0]), np.array([w/2, h/2, 0]),
            np.array([w/2, h/2, 0]) + offset, np.array([-w/2, h/2, 0]) + offset,
            color=TEXT_SECONDARY, fill_opacity=0.05, stroke_width=2
        )
        # Side face
        side_f = Polygon(
            np.array([w/2, -h/2, 0]), np.array([w/2, h/2, 0]),
            np.array([w/2, h/2, 0]) + offset, np.array([w/2, -h/2, 0]) + offset,
            color=TEXT_SECONDARY, fill_opacity=0.05, stroke_width=2
        )

        box = VGroup(front, top_f, side_f).move_to(LEFT * 0.4 + DOWN * 0.3)
        self.play(Create(box), run_time=0.6)

        # Highlight each face one at a time
        faces_info = [
            (front, "Front", BLUE),
            (top_f, "Top", EMERALD),
            (side_f, "Right", VIOLET),
        ]

        counter = Text("Faces: 0/6", font_size=28, color=AMBER, font="Arial")
        counter.move_to(DOWN * 2.8)
        self.play(Write(counter), run_time=0.3)

        count = 0
        for face, name, color in faces_info:
            count += 1
            self.play(face.animate.set_fill(color, opacity=0.35).set_stroke(color),
                      run_time=0.4)
            new_counter = Text(f"Faces: {count}/6 (+{name} & its opposite)",
                               font_size=24, color=AMBER, font="Arial")
            new_counter.move_to(DOWN * 2.8)
            self.play(Transform(counter, new_counter), run_time=0.4)
            count += 1
            self.wait(0.2)

        # SA formula
        formula = Text("SA = 2(lw + lh + wh)", font_size=36, color=CYAN, font="Arial")
        formula.move_to(DOWN * 3.5)
        self.play(Write(formula), run_time=0.7)
        self.wait(0.5)


class GE4_9aHook(Scene):
    """GE: Two shapes overlapping perfectly via rigid motions."""
    def construct(self):
        self.camera.background_color = BG

        # Two congruent pentagons
        pts = [
            UP * 1.2,
            RIGHT * 1.1 + UP * 0.4,
            RIGHT * 0.7 + DOWN * 1,
            LEFT * 0.7 + DOWN * 1,
            LEFT * 1.1 + UP * 0.4,
        ]
        shape1 = Polygon(*pts, color=BLUE, fill_color=BLUE,
                         fill_opacity=0.2, stroke_width=3)
        shape2 = Polygon(*pts, color=ROSE, fill_color=ROSE,
                         fill_opacity=0.2, stroke_width=3)

        shape1.move_to(LEFT * 3 + UP * 0.5)
        shape2.rotate(PI / 6).move_to(RIGHT * 3 + DOWN * 0.5)

        l1 = Text("Shape 1", font_size=22, color=BLUE, font="Arial")
        l1.next_to(shape1, DOWN, buff=0.3)
        l2 = Text("Shape 2 (rotated)", font_size=22, color=ROSE, font="Arial")
        l2.next_to(shape2, DOWN, buff=0.3)

        self.play(FadeIn(shape1), FadeIn(shape2), Write(l1), Write(l2), run_time=0.7)
        self.wait(0.3)

        # Rigid motion: translate + rotate to overlap
        self.play(
            shape2.animate.rotate(-PI / 6).move_to(shape1.get_center()),
            FadeOut(l1), FadeOut(l2),
            run_time=1.5
        )

        self.play(Flash(shape1.get_center(), color=AMBER, num_lines=10), run_time=0.4)

        congruent = Text("Congruent: Rigid motions produce a perfect overlap",
                         font_size=28, color=AMBER, font="Arial")
        congruent.move_to(DOWN * 2.5)
        self.play(Write(congruent), run_time=0.8)
        self.wait(0.5)


class GE4_9bHook(Scene):
    """GE: Shape scaling with proportional measurements shown."""
    def construct(self):
        self.camera.background_color = BG

        # Small triangle with measurements
        small_tri = Polygon(
            ORIGIN, RIGHT * 2, RIGHT * 1 + UP * 1.5,
            color=BLUE, fill_color=BLUE, fill_opacity=0.15, stroke_width=2
        ).move_to(LEFT * 3 + UP * 0.5)

        s_bot = Text("2", font_size=22, color=BLUE, font="Arial")
        s_bot.next_to(small_tri, DOWN, buff=0.15)
        s_side = Text("1.5", font_size=22, color=BLUE, font="Arial")
        s_side.next_to(small_tri, RIGHT, buff=0.15)

        # Large triangle (scale factor 2)
        big_tri = Polygon(
            ORIGIN, RIGHT * 4, RIGHT * 2 + UP * 3,
            color=EMERALD, fill_color=EMERALD, fill_opacity=0.15, stroke_width=2
        ).move_to(RIGHT * 2 + UP * 0.3)

        b_bot = Text("4", font_size=22, color=EMERALD, font="Arial")
        b_bot.next_to(big_tri, DOWN, buff=0.15)
        b_side = Text("3", font_size=22, color=EMERALD, font="Arial")
        b_side.next_to(big_tri, RIGHT, buff=0.15)

        self.play(FadeIn(small_tri), Write(s_bot), Write(s_side), run_time=0.6)
        self.wait(0.2)

        # Scale arrow
        arrow = Arrow(LEFT * 1.5, RIGHT * 0.3, color=AMBER, stroke_width=3)
        sf = Text("x 2", font_size=28, color=AMBER, font="Arial")
        sf.next_to(arrow, UP, buff=0.15)
        self.play(Create(arrow), Write(sf), run_time=0.4)

        self.play(FadeIn(big_tri), Write(b_bot), Write(b_side), run_time=0.6)

        # Proportions
        prop = Text("2/4 = 1.5/3 = 1/2  (scale factor)", font_size=28,
                     color=CYAN, font="Arial")
        prop.move_to(DOWN * 2.8)
        self.play(Write(prop), run_time=0.7)

        similar = Text("Similar shapes have proportional sides", font_size=26,
                       color=VIOLET, font="Arial")
        similar.move_to(DOWN * 3.5)
        self.play(Write(similar), run_time=0.6)
        self.wait(0.5)


class GE4_10Hook(Scene):
    """GE: Midpoint formula visualized on grid."""
    def construct(self):
        self.camera.background_color = BG

        axes = Axes(
            x_range=[-1, 9, 1], y_range=[-1, 7, 1],
            x_length=7, y_length=5,
            axis_config={"color": TEXT_SECONDARY, "stroke_width": 1,
                         "include_numbers": False},
            tips=False
        ).shift(LEFT * 0.5 + DOWN * 0.3)
        axes_labels = add_axes_labels(axes, [-1, 9, 1], [-1, 7, 1], font_size=18, color=TEXT_PRIMARY)

        self.play(Create(axes), FadeIn(axes_labels), run_time=0.5)

        # Two points
        p1 = axes.c2p(2, 1)
        p2 = axes.c2p(6, 5)
        mid_pos = axes.c2p(4, 3)

        dot1 = Dot(p1, color=BLUE, radius=0.1)
        dot2 = Dot(p2, color=ROSE, radius=0.1)
        l1 = Text("(2, 1)", font_size=22, color=BLUE, font="Arial").next_to(dot1, DOWN + LEFT, buff=0.15)
        l2 = Text("(6, 5)", font_size=22, color=ROSE, font="Arial").next_to(dot2, UP + RIGHT, buff=0.15)

        seg = Line(p1, p2, color=TEXT_SECONDARY, stroke_width=2)

        self.play(FadeIn(dot1), FadeIn(dot2), Write(l1), Write(l2), Create(seg), run_time=0.7)
        self.wait(0.3)

        # Midpoint
        mid_dot = Dot(mid_pos, color=AMBER, radius=0.12)
        mid_label = Text("(4, 3)", font_size=24, color=AMBER, font="Arial")
        mid_label.next_to(mid_dot, UP + LEFT, buff=0.15)

        self.play(FadeIn(mid_dot), Write(mid_label), run_time=0.5)

        # Show calculation
        calc = Text("M = ((2+6)/2, (1+5)/2) = (4, 3)", font_size=28,
                     color=CYAN, font="Arial")
        calc.move_to(DOWN * 3)
        self.play(Write(calc), run_time=0.8)

        formula = Text("Midpoint = ((x1+x2)/2, (y1+y2)/2)", font_size=28,
                       color=EMERALD, font="Arial")
        formula.move_to(UP * 3.2)
        self.play(Write(formula), run_time=0.7)
        self.wait(0.5)


# ---------------------------------------------------------------------------
# STATISTICS
# ---------------------------------------------------------------------------

class DataDisplaysHook(Scene):
    """ST: Data morphing between bar chart, line graph, pie chart, histogram."""
    def construct(self):
        self.camera.background_color = BG

        data = [3, 5, 2, 7, 4]
        colors = [BLUE, EMERALD, ROSE, AMBER, VIOLET]

        # Bar chart
        bars = VGroup()
        for i, val in enumerate(data):
            bar = Rectangle(width=0.6, height=val * 0.4, color=colors[i],
                            fill_color=colors[i], fill_opacity=0.5, stroke_width=2)
            bar.move_to(LEFT * 2.4 + RIGHT * i * 1.2 + UP * (val * 0.2 - 1.5))
            bars.add(bar)

        title = Text("Bar Chart", font_size=32, color=TEXT_PRIMARY, font="Arial")
        title.move_to(UP * 3)
        self.play(Write(title), *[GrowFromEdge(b, DOWN) for b in bars], run_time=1)
        self.wait(0.4)

        # Morph to line graph
        dots = VGroup()
        for i, val in enumerate(data):
            d = Dot(LEFT * 2.4 + RIGHT * i * 1.2 + UP * (val * 0.4 - 1.5),
                    color=colors[i], radius=0.08)
            dots.add(d)
        lines = VGroup()
        for i in range(len(data) - 1):
            l = Line(dots[i].get_center(), dots[i + 1].get_center(),
                     color=CYAN, stroke_width=2)
            lines.add(l)

        title2 = Text("Line Graph", font_size=32, color=TEXT_PRIMARY, font="Arial")
        title2.move_to(UP * 3)
        self.play(FadeOut(bars), FadeIn(dots), *[Create(l) for l in lines],
                  Transform(title, title2), run_time=0.8)
        self.wait(0.4)

        # Morph to pie chart
        pie = VGroup()
        total = sum(data)
        start = 0
        for i, val in enumerate(data):
            angle = val / total * TAU
            sector = Sector(outer_radius=1.5, start_angle=start, angle=angle,
                            color=colors[i], fill_opacity=0.5, stroke_width=2)
            pie.add(sector)
            start += angle

        title3 = Text("Pie Chart", font_size=32, color=TEXT_PRIMARY, font="Arial")
        title3.move_to(UP * 3)
        self.play(FadeOut(dots), FadeOut(lines),
                  *[FadeIn(s) for s in pie],
                  Transform(title, title3), run_time=0.8)
        self.wait(0.4)

        # Final text
        title4 = Text("Same data, different views!", font_size=32, color=AMBER, font="Arial")
        title4.move_to(UP * 3)
        self.play(Transform(title, title4), run_time=0.6)
        self.wait(0.5)


class BoxPlotsHook(Scene):
    """ST: Numbers sorting on a line, box forming around quartiles."""
    def construct(self):
        self.camera.background_color = BG

        data = [2, 4, 5, 7, 8, 10, 11, 13, 15]
        # Q1=4.5, median=8, Q3=12, min=2, max=15

        # Number line
        nline = NumberLine(
            x_range=[0, 16, 2], length=10,
            color=TEXT_SECONDARY, stroke_width=1,
            include_numbers=False,
        ).shift(DOWN * 0.5)
        nline_labels = add_number_labels(nline, 0, 16, 2, font_size=20, color=TEXT_PRIMARY)

        self.play(Create(nline), FadeIn(nline_labels), run_time=0.5)

        # Drop data points
        dots = VGroup()
        for val in data:
            d = Dot(nline.n2p(val), color=BLUE, radius=0.08)
            d_start = d.copy().shift(UP * 2)
            dots.add(d)

        self.play(*[FadeIn(d, shift=DOWN * 2) for d in dots], run_time=0.8)
        self.wait(0.3)

        # Build box plot
        q1_x = nline.n2p(4.5)[0]
        med_x = nline.n2p(8)[0]
        q3_x = nline.n2p(12)[0]
        min_x = nline.n2p(2)[0]
        max_x = nline.n2p(15)[0]
        y_center = -0.5

        # Box
        box = Rectangle(width=q3_x - q1_x, height=1, color=INDIGO,
                        fill_color=INDIGO, fill_opacity=0.2, stroke_width=2)
        box.move_to(np.array([(q1_x + q3_x) / 2, y_center, 0]))

        # Median line
        med_line = Line(np.array([med_x, y_center - 0.5, 0]),
                        np.array([med_x, y_center + 0.5, 0]),
                        color=AMBER, stroke_width=3)

        # Whiskers
        left_whisker = Line(np.array([min_x, y_center, 0]),
                            np.array([q1_x, y_center, 0]),
                            color=EMERALD, stroke_width=2)
        right_whisker = Line(np.array([q3_x, y_center, 0]),
                             np.array([max_x, y_center, 0]),
                             color=EMERALD, stroke_width=2)

        self.play(FadeIn(box), Create(med_line), run_time=0.7)
        self.play(Create(left_whisker), Create(right_whisker), run_time=0.5)

        # Labels
        labels = VGroup(
            Text("Min", font_size=18, color=EMERALD, font="Arial").move_to(
                np.array([min_x, y_center + 0.9, 0])),
            Text("Q1", font_size=18, color=INDIGO, font="Arial").move_to(
                np.array([q1_x, y_center + 0.9, 0])),
            Text("Median", font_size=18, color=AMBER, font="Arial").move_to(
                np.array([med_x, y_center + 0.9, 0])),
            Text("Q3", font_size=18, color=INDIGO, font="Arial").move_to(
                np.array([q3_x, y_center + 0.9, 0])),
            Text("Max", font_size=18, color=EMERALD, font="Arial").move_to(
                np.array([max_x, y_center + 0.9, 0])),
        )
        self.play(*[Write(l) for l in labels], run_time=0.6)

        title = Text("Box Plot: See the spread at a glance", font_size=28,
                      color=CYAN, font="Arial")
        title.move_to(UP * 2.5)
        self.play(Write(title), run_time=0.6)
        self.wait(0.5)


class CompoundProbabilityHook(Scene):
    """ST: Tree diagram branching — coin flip x dice roll = 12 outcomes."""
    def construct(self):
        self.camera.background_color = BG

        title = Text("Compound Probability", font_size=32, color=TEXT_PRIMARY, font="Arial")
        title.move_to(UP * 3.3)
        self.play(Write(title), run_time=0.5)

        # Root
        root = Dot(LEFT * 5 + UP * 0, color=TEXT_PRIMARY, radius=0.08)
        self.play(FadeIn(root), run_time=0.2)

        # Coin: Heads / Tails
        h_pos = LEFT * 2.5 + UP * 1.8
        t_pos = LEFT * 2.5 + DOWN * 1.8

        h_dot = Dot(h_pos, color=AMBER, radius=0.08)
        t_dot = Dot(t_pos, color=BLUE, radius=0.08)
        h_label = Text("H", font_size=24, color=AMBER, font="Arial").next_to(h_dot, UP, buff=0.1)
        t_label = Text("T", font_size=24, color=BLUE, font="Arial").next_to(t_dot, DOWN, buff=0.1)

        l_h = Line(root.get_center(), h_pos, color=AMBER, stroke_width=1.5)
        l_t = Line(root.get_center(), t_pos, color=BLUE, stroke_width=1.5)

        self.play(Create(l_h), Create(l_t), FadeIn(h_dot), FadeIn(t_dot),
                  Write(h_label), Write(t_label), run_time=0.7)

        # Dice: 1-6 for each branch
        dice_colors = [INDIGO, CYAN, EMERALD, ROSE, VIOLET, TEXT_PRIMARY]
        dice_groups = VGroup()

        for branch_y, parent_pos in [(UP * 1.8, h_pos), (DOWN * 1.8, t_pos)]:
            for i in range(6):
                y_offset = (i - 2.5) * 0.55
                pos = RIGHT * 1 + parent_pos[1] * UP + UP * y_offset
                dot = Dot(pos, color=dice_colors[i], radius=0.05)
                num = Text(str(i + 1), font_size=16, color=dice_colors[i], font="Arial")
                num.next_to(dot, RIGHT, buff=0.1)
                line = Line(parent_pos, pos, color=TEXT_SECONDARY, stroke_width=0.8)
                dice_groups.add(VGroup(line, dot, num))

        self.play(*[FadeIn(g) for g in dice_groups], run_time=1)
        self.wait(0.3)

        # Count outcomes
        count = Text("2 x 6 = 12 total outcomes", font_size=32, color=CYAN, font="Arial")
        count.move_to(DOWN * 3.3)
        self.play(Write(count), run_time=0.7)
        self.wait(0.5)


class SamplingHook(Scene):
    """ST: 100 dots (population), 10 highlighted (sample)."""
    def construct(self):
        self.camera.background_color = BG

        title = Text("Sampling", font_size=36, color=TEXT_PRIMARY, font="Arial")
        title.move_to(UP * 3.2)
        self.play(Write(title), run_time=0.5)

        # 100 dots in a grid arrangement
        import random
        random.seed(42)

        pop = VGroup()
        positions = []
        for row in range(10):
            for col in range(10):
                x = LEFT * 4 + RIGHT * col * 0.8 + RIGHT * 0.4
                y = UP * 2 + DOWN * row * 0.45 + DOWN * 0.3
                pos = x + y
                d = Dot(pos, color=TEXT_SECONDARY, radius=0.06)
                pop.add(d)
                positions.append((d, pos))

        self.play(*[FadeIn(d) for d in pop], run_time=0.8)

        pop_label = Text("Population: 100", font_size=24, color=TEXT_SECONDARY, font="Arial")
        pop_label.move_to(RIGHT * 4.5 + UP * 2)
        self.play(Write(pop_label), run_time=0.4)

        # Highlight 10 random as sample
        sample_indices = random.sample(range(100), 10)
        sample_dots = VGroup()
        for i in sample_indices:
            d = pop[i]
            sample_dots.add(d)

        self.play(*[d.animate.set_color(AMBER).scale(2) for d in sample_dots], run_time=0.8)

        sample_label = Text("Sample: 10", font_size=24, color=AMBER, font="Arial")
        sample_label.move_to(RIGHT * 4.5 + UP * 1.2)
        self.play(Write(sample_label), run_time=0.4)

        insight = Text("Predict the whole from a part", font_size=32, color=CYAN, font="Arial")
        insight.move_to(DOWN * 3.3)
        self.play(Write(insight), run_time=0.7)
        self.wait(0.5)


class ScatterPlotsHook(Scene):
    """ST: Dots falling into place on a grid, trend line appearing."""
    def construct(self):
        self.camera.background_color = BG

        axes = Axes(
            x_range=[0, 10, 2], y_range=[0, 10, 2],
            x_length=6, y_length=5,
            axis_config={"color": TEXT_SECONDARY, "stroke_width": 1},
            tips=False
        ).shift(DOWN * 0.3)

        x_label = Text("Hours Studied", font_size=20, color=TEXT_SECONDARY, font="Arial")
        x_label.next_to(axes, DOWN, buff=0.3)
        y_label = Text("Test Score", font_size=20, color=TEXT_SECONDARY, font="Arial")
        y_label.next_to(axes, LEFT, buff=0.3).rotate(PI / 2)

        self.play(Create(axes), Write(x_label), Write(y_label), run_time=0.6)

        # Data points (positive correlation)
        points_data = [(1, 2), (2, 3), (3, 3.5), (4, 5), (5, 5.5),
                       (6, 7), (7, 6.5), (8, 8), (9, 8.5), (2, 4), (5, 6), (7, 7.5)]

        dots = VGroup()
        for x, y in points_data:
            d = Dot(axes.c2p(x, y), color=BLUE, radius=0.08)
            dots.add(d)

        # Dots fall in from above
        for d in dots:
            d_start = d.get_center().copy()
            d.shift(UP * 4)
        self.play(*[d.animate.move_to(axes.c2p(points_data[i][0], points_data[i][1]))
                    for i, d in enumerate(dots)], run_time=1.2)
        self.wait(0.3)

        # Trend line
        trend = axes.plot(lambda x: 0.85 * x + 0.8, x_range=[0.5, 9.5],
                          color=AMBER, stroke_width=3)
        self.play(Create(trend), run_time=0.8)

        label = Text("Trend: More study = higher scores", font_size=26,
                      color=CYAN, font="Arial")
        label.move_to(UP * 3)
        self.play(Write(label), run_time=0.7)
        self.wait(0.5)


class LineOfBestFitHook(Scene):
    """ST: Scatter plot with a line rotating to minimize distances."""
    def construct(self):
        self.camera.background_color = BG

        axes = Axes(
            x_range=[0, 10, 2], y_range=[0, 10, 2],
            x_length=6, y_length=5,
            axis_config={"color": TEXT_SECONDARY, "stroke_width": 1},
            tips=False
        ).shift(DOWN * 0.3)

        self.play(Create(axes), run_time=0.4)

        # Data points
        points_data = [(1, 2.5), (2, 3), (3, 4.5), (4, 4), (5, 5.5),
                       (6, 6), (7, 7.5), (8, 7), (9, 9)]

        dots = VGroup()
        for x, y in points_data:
            dots.add(Dot(axes.c2p(x, y), color=BLUE, radius=0.09))
        self.play(*[FadeIn(d) for d in dots], run_time=0.5)

        # Start with a bad line
        line = axes.plot(lambda x: 0.3 * x + 6, x_range=[0.5, 9.5],
                         color=ROSE, stroke_width=3)
        bad_label = Text("Bad fit", font_size=24, color=ROSE, font="Arial")
        bad_label.move_to(UP * 3)
        self.play(Create(line), Write(bad_label), run_time=0.6)

        # Show residuals
        residuals = VGroup()
        for x, y in points_data:
            y_pred = 0.3 * x + 6
            res = DashedLine(axes.c2p(x, y), axes.c2p(x, y_pred),
                             color=ROSE, stroke_width=1, dash_length=0.08)
            residuals.add(res)
        self.play(*[Create(r) for r in residuals], run_time=0.5)
        self.wait(0.3)

        # Rotate to better fit
        better_line = axes.plot(lambda x: 0.82 * x + 1, x_range=[0.5, 9.5],
                                color=EMERALD, stroke_width=3)
        good_label = Text("Best fit!", font_size=24, color=EMERALD, font="Arial")
        good_label.move_to(UP * 3)

        new_residuals = VGroup()
        for x, y in points_data:
            y_pred = 0.82 * x + 1
            res = DashedLine(axes.c2p(x, y), axes.c2p(x, y_pred),
                             color=EMERALD, stroke_width=1, dash_length=0.08)
            new_residuals.add(res)

        self.play(
            Transform(line, better_line),
            Transform(residuals, new_residuals),
            Transform(bad_label, good_label),
            run_time=1.5
        )

        insight = Text("Minimizes total distance to all points", font_size=24,
                       color=CYAN, font="Arial")
        insight.move_to(DOWN * 3.3)
        self.play(Write(insight), run_time=0.6)
        self.wait(0.5)


class TwoWayTablesHook(Scene):
    """ST: Grid filling with numbers — rows and columns as categories."""
    def construct(self):
        self.camera.background_color = BG

        title = Text("Two-Way Table", font_size=36, color=TEXT_PRIMARY, font="Arial")
        title.move_to(UP * 3.2)
        self.play(Write(title), run_time=0.5)

        # Table structure
        cell_w, cell_h = 1.6, 0.7
        rows = ["Dog", "Cat", "Total"]
        cols = ["", "Boys", "Girls", "Total"]

        table_group = VGroup()

        # Draw grid
        for r in range(4):
            for c in range(4):
                rect = Rectangle(width=cell_w, height=cell_h,
                                 color=TEXT_SECONDARY, stroke_width=1)
                rect.move_to(LEFT * 2.4 + RIGHT * c * cell_w +
                             UP * 1.5 + DOWN * r * cell_h)
                if r == 0 or c == 0:
                    rect.set_fill(SURFACE, opacity=0.3)
                table_group.add(rect)

        self.play(FadeIn(table_group), run_time=0.5)

        # Headers
        headers_data = [
            (0, 1, "Boys", BLUE), (0, 2, "Girls", ROSE), (0, 3, "Total", AMBER),
            (1, 0, "Dog", EMERALD), (2, 0, "Cat", VIOLET), (3, 0, "Total", AMBER),
        ]
        headers = VGroup()
        for r, c, text, color in headers_data:
            t = Text(text, font_size=20, color=color, font="Arial")
            t.move_to(LEFT * 2.4 + RIGHT * c * cell_w +
                      UP * 1.5 + DOWN * r * cell_h)
            headers.add(t)
        self.play(*[Write(h) for h in headers], run_time=0.6)

        # Data values (filling in one at a time)
        values_data = [
            (1, 1, "15", TEXT_PRIMARY), (1, 2, "10", TEXT_PRIMARY), (1, 3, "25", AMBER),
            (2, 1, "8", TEXT_PRIMARY), (2, 2, "12", TEXT_PRIMARY), (2, 3, "20", AMBER),
            (3, 1, "23", AMBER), (3, 2, "22", AMBER), (3, 3, "45", CYAN),
        ]
        for r, c, val, color in values_data:
            t = Text(val, font_size=22, color=color, font="Arial")
            t.move_to(LEFT * 2.4 + RIGHT * c * cell_w +
                      UP * 1.5 + DOWN * r * cell_h)
            self.play(FadeIn(t, shift=UP * 0.2), run_time=0.25)

        insight = Text("Organize data by two categories", font_size=26,
                       color=CYAN, font="Arial")
        insight.move_to(DOWN * 2.5)
        self.play(Write(insight), run_time=0.6)
        self.wait(0.5)


class StatisticalReasoningHook(Scene):
    """ST: Ice cream and drowning rates — Correlation != Causation."""
    def construct(self):
        self.camera.background_color = BG

        # Two graphs side by side
        ax_left = Axes(
            x_range=[0, 12, 3], y_range=[0, 100, 25],
            x_length=4, y_length=3,
            axis_config={"color": TEXT_SECONDARY, "stroke_width": 1},
            tips=False
        ).shift(LEFT * 3.2 + DOWN * 0.3)

        ax_right = Axes(
            x_range=[0, 12, 3], y_range=[0, 50, 10],
            x_length=4, y_length=3,
            axis_config={"color": TEXT_SECONDARY, "stroke_width": 1},
            tips=False
        ).shift(RIGHT * 3.2 + DOWN * 0.3)

        l_title = Text("Ice Cream Sales", font_size=22, color=AMBER, font="Arial")
        l_title.next_to(ax_left, UP, buff=0.3)
        r_title = Text("Drowning Incidents", font_size=22, color=ROSE, font="Arial")
        r_title.next_to(ax_right, UP, buff=0.3)

        # Both rise in summer (months 5-8)
        ice_cream = ax_left.plot(
            lambda x: 20 + 60 * np.exp(-0.5 * (x - 7) ** 2 / 4),
            x_range=[1, 11], color=AMBER, stroke_width=3
        )
        drowning = ax_right.plot(
            lambda x: 8 + 35 * np.exp(-0.5 * (x - 7) ** 2 / 4),
            x_range=[1, 11], color=ROSE, stroke_width=3
        )

        self.play(Create(ax_left), Create(ax_right),
                  Write(l_title), Write(r_title), run_time=0.6)
        self.play(Create(ice_cream), Create(drowning), run_time=1.2)

        # Both rise together
        summer_l = Text("Summer", font_size=18, color=TEXT_SECONDARY, font="Arial")
        summer_l.move_to(ax_left.c2p(7, -15))
        summer_r = Text("Summer", font_size=18, color=TEXT_SECONDARY, font="Arial")
        summer_r.move_to(ax_right.c2p(7, -8))
        self.play(Write(summer_l), Write(summer_r), run_time=0.4)
        self.wait(0.4)

        # Both trend up arrows
        up1 = Arrow(ax_left.c2p(4, 40), ax_left.c2p(7, 75), color=CYAN, stroke_width=2)
        up2 = Arrow(ax_right.c2p(4, 20), ax_right.c2p(7, 40), color=CYAN, stroke_width=2)
        self.play(Create(up1), Create(up2), run_time=0.5)
        self.wait(0.3)

        # The punchline
        wrong = Text("Does ice cream cause drowning?", font_size=30,
                      color=ROSE, font="Arial")
        wrong.move_to(DOWN * 2.5)
        self.play(Write(wrong), run_time=0.7)
        self.wait(0.4)

        # Cross it out
        cross = Line(wrong.get_left(), wrong.get_right(), color=ROSE, stroke_width=4)
        self.play(Create(cross), run_time=0.3)

        answer = Text("Correlation does NOT equal Causation!", font_size=32,
                       color=CYAN, font="Arial")
        answer.move_to(DOWN * 3.5)
        self.play(Write(answer), run_time=0.8)

        hidden = Text("(Hidden variable: hot weather)", font_size=22,
                       color=TEXT_SECONDARY, font="Arial")
        hidden.move_to(UP * 3)
        self.play(Write(hidden), run_time=0.5)
        self.wait(0.5)
