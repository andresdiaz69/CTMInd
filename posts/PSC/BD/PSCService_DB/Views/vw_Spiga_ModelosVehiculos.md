# View: vw_Spiga_ModelosVehiculos

## Usa los objetos:
- [[ClasificacionTipos]]
- [[Modelos]]

```sql
CREATE view [dbo].[vw_Spiga_ModelosVehiculos] as
select distinct PkFkMarcas,PkFkGamas,PkCodModelo,PkExtModelo,PkAñoModelo,Nombre,Activo,FkCombustibleTipos,FkClasificacionTipos,NombreClasificacion=t.Descripcion,
       FkCarroceriaTipos,CantidadPasajeros = m.NumeroAsientos,CapacidadDeCarga = m.CargaUtil,FkMarcaTallerModelos, FkTraccionTipos,FkCambioTipos,
	   PotenciaFiscal,PotenciaReal,Cilindrada,Aceleracion,VelocidadMax,NumeroCilindros, ConsumoInterurbano,ConsumoUrbano,ConsumoMedio,
	   EmisionesCO2Medio, Importado,VisibleWeb,PeriodoInspeccion,KilometrosInspeccion,m.Fechabaja,CodExternoModelo,PotenciaRealKw,PropioPeso,
	   CargaUtil,NumeroPuertas,NumeroPlazas,FkCajaVelocidadTipos,Neumaticos,PMA,m.FechaMod,LongitudExterior,AnchoExterior,AltoExterior,
	   DisposicionCilindros, VolanteALaIzquierda, FkMonedas,FactorCambioMoneda,NumeroEjes,FkCategoriaGamaTipos,DetalleEnFactura,
	   PorcDtoMaxVendedores, KilometrosGarantia, NumeroRuedas,NumeroVelocidades,CodigoHomologacion,NumeroAsientos,RequiereCertificacion,
	   HorasUsoInspeccion,PotenciaPTO,NeumaticosDelanteros,NeumaticosTraseros,NumCertificadoPruebaDinamica,PorcDtoMaxJefesVentas,FkPaises
from		[192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[Modelos]				m
left join	[192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[ClasificacionTipos]	t	on	m.FkClasificacionTipos = t.PkClasificacionTipos
where t.Fechabaja is null
and t.Descripcion is not null

--and Pkcodmodelo='BYD6470ST6HEV1'


```
