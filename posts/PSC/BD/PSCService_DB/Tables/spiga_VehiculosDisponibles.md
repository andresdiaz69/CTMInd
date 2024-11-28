# Table: spiga_VehiculosDisponibles

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| FkMarcas | smallint | YES |
| Marca | nvarchar | YES |
| FkGamas | smallint | YES |
| Gama | nvarchar | YES |
| FkCodModelo | nvarchar | YES |
| FkAñoModelo | nvarchar | YES |
| PrecioListaAntesDeImpuestos | decimal | YES |
| PrecioListaFull | decimal | YES |
| Costo | decimal | YES |
| ModeloActivo | bit | YES |
