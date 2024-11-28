# Stored Procedure: sp_Presupuestos_FacturacionConsignacion_PorCentro

## Usa los objetos:
- [[Presupuestos_VariablesParametrizacionesPorCentros]]
- [[Presupuestos_VariablesParametrizacionesPorLineas]]
- [[Presupuestos_VariablesTipos]]
- [[vw_Presupuestos_Comercial_PromedioPrecioSinImpuestos_PorModelos]]
- [[vw_Presupuestos_Variables_PorModelos]]

```sql
CREATE PROCEDURE [dbo].[sp_Presupuestos_FacturacionConsignacion_PorCentro]
(
	@Ano_Periodo  SMALLINT,
	@CodigoCentro SMALLINT,
	@CodigoLinea  SMALLINT,
	@idClase      SMALLINT
) AS
BEGIN 
	-- =============================================
	-- Control de Cambios
	-- 2024|10|30 - Alexis Barreto - Creado para Listar Facturacion de consignaciones y calcular valores por mes
	-- Modulo - Presupuestos
	-- =============================================
	   
	SET NOCOUNT ON
	SET FMTONLY OFF

	--declare @Ano_Periodo  SMALLINT = 2025;
	--declare	@CodigoCentro SMALLINT = 1;
	--declare	@CodigoLinea  SMALLINT = 19;
	--declare	@idClase      SMALLINT = 1;


	DECLARE @QParticipacionCentro DECIMAL (18, 2);

	SET @QParticipacionCentro = (
		SELECT valor 
		 FROM [Presupuestos_VariablesParametrizacionesPorLineas] 
		 WHERE IdTipo      = 168 -- 'Unidades Compañia' 
		   AND Ano_Periodo = @Ano_Periodo 
		   AND CodigoLinea = @CodigoLinea
		   and IdClase     = @idClase
	    ) * 
		(
		SELECT valor 
		  FROM Presupuestos_VariablesParametrizacionesPorCentros vpc
	     inner join Presupuestos_VariablesTipos vt ON vt.IdTipo = vpc.IdTipo
		 WHERE vpc.IdTipo     = 169 -- '% Participación Centro' 
		   AND IdSubCategoria = 27 -- 'Vehiculos Nuevos' 
		   AND CodigoCentro   = @CodigoCentro 
		   AND Ano_Periodo    = @Ano_Periodo
		   and IdClase        = @idClase
	    );

	 SELECT	a.Ano_Periodo,	                                a.CodigoLinea,		                                        a.NombreLinea, 
			a.CodigoCentro,	                                a.NombreCentro,		                                        a.CodigoGama,
			a.Gama,			                                a.CodigoModelo,		                                        a.Modelo,
			--a.IVA,			a.Impoconsumo,
			a.Ene * ppai.Enero AS Enero,					a.Ene * ppai.Enero * a.Impoconsumo AS ImpoEne,				a.Ene * ppai.Enero * a.IVA AS IVAEne,
			a.Feb * ppai.Febrero AS Febrero,				a.Feb * ppai.Febrero * a.Impoconsumo AS ImpoFeb,			a.Feb * ppai.Febrero * a.IVA AS IVAFeb,
			a.Mar * ppai.Marzo AS Marzo,					a.Mar * ppai.Marzo * a.Impoconsumo AS ImpoMar,				a.Mar * ppai.Marzo * a.IVA AS IVAMar,
			a.Abr * ppai.Abril AS Abril,					a.Abr * ppai.Abril * a.Impoconsumo AS ImpoAbr,				a.Abr * ppai.Abril * a.IVA AS IVAAbr,
			a.May * ppai.Mayo AS Mayo,						a.May * ppai.Mayo * a.Impoconsumo AS ImpoMay,				a.May * ppai.Mayo * a.IVA AS IVAMay,
			a.Jun * ppai.Junio AS Junio,					a.Jun * ppai.Junio * a.Impoconsumo AS ImpoJun,				a.Jun * ppai.Junio * a.IVA AS IVAJun,
			a.Jul * ppai.Julio AS Julio,					a.Jul * ppai.Julio * a.Impoconsumo AS ImpoJul,				a.Jul * ppai.Julio * a.IVA AS IVAJul,
			a.Ago * ppai.Agosto AS Agosto,					a.Ago * ppai.Agosto * a.Impoconsumo AS ImpoAgo,				a.Ago * ppai.Agosto * a.IVA AS IVAAgo,
			a.Sep * ppai.Septiembre AS Septiembre,			a.Sep * ppai.Septiembre * a.Impoconsumo AS ImpoSep,			a.Sep * ppai.Septiembre * a.IVA AS IVASep,
			a.Oct * ppai.Octubre AS Octubre,				a.Oct * ppai.Octubre * a.Impoconsumo AS ImpoOct,			a.Oct * ppai.Octubre * a.IVA AS IVAOct,
			a.Nov * ppai.Noviembre AS Noviembre,			a.Nov * ppai.Noviembre * a.Impoconsumo AS ImpoNov,			a.Nov * ppai.Noviembre * a.IVA AS IVANov,
			a.Dic * ppai.Diciembre AS Diciembre,			a.Dic * ppai.Diciembre * a.Impoconsumo AS ImpoDic,			a.Dic * ppai.Diciembre * a.IVA AS IVADic,

			(a.Ene * ppai.Enero)  +	(a.Feb * ppai.Febrero)	+	(a.Mar * ppai.Marzo)	+ 
			(a.Abr * ppai.Abril)  +	(a.May * ppai.Mayo)		+	(a.Jun * ppai.Junio)	+ 
			(a.Jul * ppai.Julio)  + (a.Ago * ppai.Agosto)	+	(a.Sep * ppai.Septiembre) + 
			(a.Oct * ppai.Octubre)+ (a.Nov * ppai.Noviembre)+	(a.Dic * ppai.Diciembre)  Total,

			((a.Ene * ppai.Enero)  +	(a.Feb * ppai.Febrero)	+	(a.Mar * ppai.Marzo)	+ 
			(a.Abr * ppai.Abril)  +	(a.May * ppai.Mayo)		+	(a.Jun * ppai.Junio)	+ 
			(a.Jul * ppai.Julio)  + (a.Ago * ppai.Agosto)	+	(a.Sep * ppai.Septiembre) + 
			(a.Oct * ppai.Octubre)+ (a.Nov * ppai.Noviembre)+	(a.Dic * ppai.Diciembre)) * a.Impoconsumo  ImpoTotal, 

			((a.Ene * ppai.Enero)  +	(a.Feb * ppai.Febrero)	+	(a.Mar * ppai.Marzo)	+ 
			(a.Abr * ppai.Abril)  +	(a.May * ppai.Mayo)		+	(a.Jun * ppai.Junio)	+ 
			(a.Jul * ppai.Julio)  + (a.Ago * ppai.Agosto)	+	(a.Sep * ppai.Septiembre) + 
			(a.Oct * ppai.Octubre)+ (a.Nov * ppai.Noviembre)+	(a.Dic * ppai.Diciembre)) * a.IVA  IVATotal 

	FROM (
	
		SELECT	Ano_Periodo,	CodigoLinea,	NombreLinea, 
				CodigoCentro,	NombreCentro,	CodigoGama,	
				Gama,			CodigoModelo,	Modelo,
				IVA,			Impoconsumo,			
				[1] AS Ene,  	[2] AS Feb,		[3] AS Mar,
				[4] AS Abr,		[5] AS May,		[6] AS Jun,
				[7] AS Jul,  	[8] AS Ago,		[9] AS Sep,
				[10] AS Oct,	[11] AS Nov,	[12] AS Dic
	
		FROM (
			SELECT	vpm.Ano_Periodo,	   vpm.CodigoLinea,		vpm.NombreLinea, 		
					vpm.CodigoCentro,	   vpm.NombreCentro,	vpm.CodigoGama,	
					vpm.Gama,			   vpm.CodigoModelo,	vpm.Modelo,			
					vpm.Valor,			   vpm.IVA /100 AS IVA,	vpm.Impoconsumo /100 AS Impoconsumo,
					vpc.Mes_Periodo  Mes,  ROUND(vpm.Valor * @QParticipacionCentro * vpc.valor / 1000000, 0) AS ValorCalculado
		
			FROM vw_Presupuestos_Variables_PorModelos vpm
			LEFT JOIN Presupuestos_VariablesParametrizacionesPorCentros vpc ON vpc.Ano_Periodo  = vpm.Ano_Periodo 
																			AND vpc.CodigoCentro = vpm.CodigoCentro 
																			AND vpc.IdTipo       = 133 --'Estacionalidad VN'
																			and vpc.IdClase      = vpm.IdClase  
			WHERE vpm.Ano_Periodo	 = @Ano_Periodo 
				AND vpm.CodigoCentro = @CodigoCentro
				AND vpm.IdClase      = @idClase
				AND vpm.UsadosConsignacion = 1
		) SourceTable
		PIVOT (
			SUM(ValorCalculado)
			FOR Mes IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
		) AS PivotTable
	) A
	JOIN (
		SELECT Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre, Diciembre, CodigoModelo
  		FROM vw_Presupuestos_Comercial_PromedioPrecioSinImpuestos_PorModelos 
  		WHERE Ano_Periodo = @Ano_Periodo
			AND idclase = @idClase
			AND UsadosConsignacion = 1
	) ppai 	ON ppai.CodigoModelo = a.CodigoModelo 

END

```
