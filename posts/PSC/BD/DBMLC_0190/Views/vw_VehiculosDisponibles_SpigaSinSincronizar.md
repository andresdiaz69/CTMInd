# View: vw_VehiculosDisponibles_SpigaSinSincronizar

## Usa los objetos:
- [[VehiculosModelos]]
- [[vw_VehiculosDisponibles_Spiga]]

```sql
CREATE VIEW [dbo].[vw_VehiculosDisponibles_SpigaSinSincronizar]
AS
SELECT        dbo.VehiculosModelos.CodigoGama, dbo.VehiculosModelos.CodigoMarca, dbo.VehiculosModelos.CodigoModelo, dbo.VehiculosModelos.AnoModelo, dbo.vw_VehiculosDisponibles_Spiga.PrecioListaAntesDeImpuestos, 
                         dbo.vw_VehiculosDisponibles_Spiga.PrecioListaFull, dbo.vw_VehiculosDisponibles_Spiga.Costo, dbo.vw_VehiculosDisponibles_Spiga.ModeloActivo
FROM            dbo.VehiculosModelos LEFT OUTER JOIN
                         dbo.vw_VehiculosDisponibles_Spiga ON dbo.VehiculosModelos.AnoModelo = dbo.vw_VehiculosDisponibles_Spiga.FkAñoModelo AND 
                         dbo.VehiculosModelos.CodigoModelo = dbo.vw_VehiculosDisponibles_Spiga.FkCodModelo COLLATE Modern_Spanish_CI_AS AND dbo.VehiculosModelos.CodigoMarca = dbo.vw_VehiculosDisponibles_Spiga.FkMarcas AND 
                         dbo.VehiculosModelos.CodigoGama = dbo.vw_VehiculosDisponibles_Spiga.FkGamas
WHERE        (dbo.vw_VehiculosDisponibles_Spiga.PrecioListaFull IS NOT NULL) 
AND 
(dbo.VehiculosModelos.PrecioListaAntesDeImpuestos <> dbo.vw_VehiculosDisponibles_Spiga.PrecioListaAntesDeImpuestos
OR
dbo.VehiculosModelos.PrecioListaFull <> dbo.vw_VehiculosDisponibles_Spiga.PrecioListaFull
OR
dbo.VehiculosModelos.Costo <> dbo.vw_VehiculosDisponibles_Spiga.Costo
OR
dbo.VehiculosModelos.ModeloActivo <> dbo.vw_VehiculosDisponibles_Spiga.ModeloActivo
)

```
