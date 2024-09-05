from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '29b083e329e6'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands adjusted to create tables without dropping existing ones ###

    op.create_table('assignments',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('course_id', sa.Integer, sa.ForeignKey('courses.id', ondelete='CASCADE'), nullable=False),
        sa.Column('assignment_name', sa.String(length=100), nullable=False),
        sa.Column('due_date', sa.Date, nullable=True),
        sa.Column('weight', sa.Numeric(5, 2), nullable=True),
        sa.Column('grade', sa.Numeric(5, 2), nullable=True),
        sa.Column('created_at', sa.TIMESTAMP, server_default=sa.text('CURRENT_TIMESTAMP')),
        mysql_collate='utf8mb4_0900_ai_ci',
        mysql_default_charset='utf8mb4',
        mysql_engine='InnoDB'
    )

    # ### end Alembic commands ###


def downgrade():
    # Drop the tables in reverse order if needed.
    op.drop_table('tests')
    op.drop_table('assignments')
    op.drop_table('courses')
    op.drop_table('users')
    # ### end Alembic commands ###
