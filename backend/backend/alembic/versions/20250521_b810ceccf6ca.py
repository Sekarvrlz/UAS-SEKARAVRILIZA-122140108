"""Update sell_items: hapus photo, tambah description dan address

Revision ID: b810ceccf6ca
Revises: 15896a0dcf79
Create Date: 2025-05-21 12:44:57.569213

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b810ceccf6ca'
down_revision = '15896a0dcf79'
branch_labels = None
depends_on = None


def upgrade():
    # Tambah kolom 'address' dengan nullable=True dulu supaya tidak error karena data lama belum ada nilai
    op.add_column('sell_items', sa.Column('address', sa.String(), nullable=True))

    # Isi kolom 'address' untuk baris lama dengan nilai default supaya tidak ada NULL
    op.execute("UPDATE sell_items SET address = 'alamat default' WHERE address IS NULL")

    # Ubah kolom 'address' menjadi NOT NULL setelah data sudah terisi
    op.alter_column('sell_items', 'address', nullable=False)

    # Hapus kolom 'alamat' (karena sudah diganti dengan 'address')
    op.drop_column('sell_items', 'alamat')

    # Kalau mau hapus kolom 'photo', tambahkan juga op.drop_column('sell_items', 'photo') di sini
    # Contoh:
    # op.drop_column('sell_items', 'photo')


def downgrade():
    # Balikan perubahan: tambah kolom 'alamat' lagi, dengan default agar tidak error
    op.add_column('sell_items', sa.Column('alamat', sa.VARCHAR(), server_default=sa.text("''::character varying"), nullable=False))

    # Hapus kolom 'address'
    op.drop_column('sell_items', 'address')

    # Jika hapus kolom 'photo' di upgrade, tambahkan juga di downgrade untuk tambah kolom itu kembali
    # Contoh:
    # op.add_column('sell_items', sa.Column('photo', sa.String(), nullable=True))
