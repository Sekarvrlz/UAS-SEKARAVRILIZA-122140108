"""create sell_items and buy_items tables

Revision ID: 15896a0dcf79
Revises: 
Create Date: 2025-05-17 18:16:37.941746
"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '15896a0dcf79'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # create models table (tetap sama)
    op.create_table('models',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.Text(), nullable=True),
        sa.Column('value', sa.Integer(), nullable=True),
        sa.PrimaryKeyConstraint('id', name=op.f('pk_models'))
    )
    op.create_index('my_index', 'models', ['name'], unique=True, mysql_length=255)

    # create sell_items table tanpa photo, tapi dengan description dan address
    op.create_table('sell_items',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('category', sa.String(), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),  # tambahan
        sa.Column('address', sa.String(), nullable=False),     # tambahan
        sa.Column('weight', sa.Float(), nullable=False),
        sa.Column('price', sa.Float(), nullable=False),
        sa.Column('status', sa.String(), nullable=True),
        sa.Column('is_deleted', sa.Boolean(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.PrimaryKeyConstraint('id', name=op.f('pk_sell_items'))
    )

    # create buy_items table (tetap sama)
    op.create_table('buy_items',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('sell_item_id', sa.Integer(), nullable=False),
        sa.Column('buyer_name', sa.String(), nullable=False),
        sa.Column('status', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.ForeignKeyConstraint(['sell_item_id'], ['sell_items.id'], name=op.f('fk_buy_items_sell_item_id_sell_items')),
        sa.PrimaryKeyConstraint('id', name=op.f('pk_buy_items'))
    )


def downgrade():
    op.drop_table('buy_items')
    op.drop_table('sell_items')
    op.drop_index('my_index', table_name='models', mysql_length=255)
    op.drop_table('models')
